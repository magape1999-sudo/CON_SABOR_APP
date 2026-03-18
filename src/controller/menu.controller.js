import Menu from "../models/Menu.js"

export const createMenu = async (req,res)=>{

const menu = new Menu(req.body)

await menu.save()

res.json(menu)

}

export const getMenu = async (req,res)=>{

const menu = await Menu.find()

res.json(menu)

}

export const updateMenu = async (req,res)=>{

const menu = await Menu.findByIdAndUpdate(

req.params.id,
req.body,
{new:true}

)

res.json(menu)

}

export const deleteMenu = async (req,res)=>{

await Menu.findByIdAndDelete(req.params.id)

res.json({msg:"Menu eliminado"})

}