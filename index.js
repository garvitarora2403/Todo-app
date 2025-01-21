const express=require("express")
const path=require("path")
require("dotenv").config()

const Todo=require('./models/todo')
const {connectToMongodb}=require('./connect')
const app=express();
const PORT=process.env.PORT || 8000;


app.set("view engine","ejs")
app.set('views',path.resolve("./views")); //setting views as a path

app.use(express.json())
app.use(express.urlencoded({extended:false}))

connectToMongodb()

app.get("/",async(req,res)=>{
    const todos = await Todo.find({});
    return res.render("home",{
        todos:todos
    })
})

app.post("/todo/add",async(req,res)=>{
    if (!req.body.title) {
        return res.redirect("/");
    }
    try {
   
        const todo=await Todo.create(req.body);
        // console.log(todo)
    
    
    const todos = await Todo.find({});
   
    return res.redirect("/");
 
        
    } catch (error) {
        const todos = await Todo.find({});
        console.log("error in creating yaara" + error)
       
        return res.redirect("/");
    
    }

    
})


app.get('/todo/edit/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
          
            return res.redirect("/");  
        }
        // return res.redirect("/")
        return res.render("edit", { todo: todo });
    } catch (error) {
        // console.log(error);
        return res.redirect("/"); 
    }
});

app.post("/todo/updateTodo/:id",async(req,res)=>{

    try {
        
        const id=req.params.id
        console.log(id)
        const { title, priority, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id,{
            title,
            priority,
            completed
        },{ new: true })
        console.log("Updated Todo:", updatedTodo)
        
        return res.redirect("/");
    } catch (error) {
        console.log(error);
    }
})

app.post("/todo/deleteTodo/:id",async(req,res)=>{
    const TodoId=req.body.id;
    await Todo.deleteOne(TodoId)
    const todos=await Todo.find({})
    // console.log("deleted todod is " + todos)
    // return res.render("home",{
    //     todos:todos
    // })  

    return res.redirect("/");
   
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})