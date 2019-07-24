const {GraphQLServer} = require('graphql-yoga')


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

let idCount = links.length
const resolvers = {
    Query:{
        info:()=> `This is the API of a Hackernews Clone`,
        link:(id)=>links[id],
        feed: ()=>links,
    },

    Mutation:{
        post:(parent,args)=>{
            const link = {
                id:`link-${idCount++}`,
                description:args.description,
                url:args.url,
            }
            links.push(link)            
            return link
        },
        updateLink:(parent,args)=>{
            const link = {  
                id:`link-${args.id}`,              
                description:args.description,
                url:args.url,
            }
            links[Number(args.id)]=link
            console.log(links,'test link')
            return link
            
        },
        deleteLink:(parent,args)=>{
            console.log(args)
            console.log(links,'before')
            if(links.length===1){
                links = []
            }
            links = links.slice(0,args.id-1).concat(links.slice(args.id,links.length))
            console.log(links,'after')
            // return `link ${args.id} is deleted`
        }
    },
        
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(()=> console.log(`Server is running on http://localhost:4000`))

