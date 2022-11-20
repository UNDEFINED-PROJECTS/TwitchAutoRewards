const add_class_list = (object , class_list = []) =>{
    for (class_ of class_list){
        object.classList.add(class_)
    }
}

const add_children = (object , childs=[])=>{
    for (child in childs) {
        object.appendChild(child);
    }
}

const add_Events = (object, events=[])=>{
    for (_event of events) {
        object.addEventListener(_event.action, _event.function);
    }
}

const MakeBasicObject = (type="div", id=undefined)=>{
    let obj = document.createElement(type);
    if(id)
        obj.setAttribute('id',id)
    return obj
}

const GENHTMLBUTTON = (Name = "", Text="", Events = [], id=undefined, ClassList=[], Childs=[])=>{
    let obj = MakeBasicObject("button", id)
    add_children(obj, Childs)
    add_class_list(obj, ClassList)
    add_Events(obj, Events)
    return obj
}

class Style_Area{
    __instance__ = undefined;
    
    static get(){
        if(Style_Area.__instance__ == undefined){
            Style_Area.__instance__ = new Style_Area()
        }
        return Style_Area.__instance__
    }

    constructor(){
        this.Style_Objects = [] 
        this.Style_Area = MakeBasicObject("style")
    }

    add_block(identifier = "", props=[]){
        let props_inline = "";
        for(let prop of props){
            props_inline += "\n"+prop; 
        }

        let temp = `
            \n${identifier} {
                ${props_inline}
            }
        `;
        
        this.Style_Objects.push({
            css_text : temp,
            identifier: identifier,
            props: props,
            props_inline: props_inline
        })
    }

    render(){
        let temp = ""
        for (let blocks of this.Style_Objects){
            temp += blocks.css_text
        }
        this.Style_Area.innerHTML = temp     
    }

}



class AutoRewards {
    
    setStyles(){
        this.style_manager.add_block('btn', [
            "width: 200px;",
            "position: fixed;",
            "top: 0;",
            "left: 0;",
        ])
    }

    ButtonTrackAction(event){
        
        let temp_target = event.target
        if(temp_target.getAttribute('id')) {
            this.target = `#${temp_target.getAttribute('id')}`
            return;
        }
        
        for(let class_ of temp_target.classList){
            r_find = document.querySelectorAll(`.${class_}`)
            if(r_find.length == 1){
                this.target = `.${class_}}`;
                return;
            }
        }

        console.log("Erro ao localizar o alvo")
    }



    constructor(){
        this.style_manager = new Style_Area()
        this.setStyles()
        this.target = undefined

        this.TrackButton = GENHTMLBUTTON.call(
            {
                ClassList : [
                    "btn"
                ],
                Events : [
                    {
                        action: "click",
                        function: this.ButtonTrackAction
                    }
                ],
                Text : "Rastrear Objeto e iniciar",
            }
        )
    }



}

