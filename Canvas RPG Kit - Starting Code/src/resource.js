class resources{
    constructor(){
        this.toload={
            sky:"/sprites/sky.png",
            ground:"/sprites/ground.png",
            hero:"/sprites/hero-sheet.png",
            shadow:"/sprites/shadow.png"
        };

        this.images={};

        Object.keys(this.toload).forEach(key=>{
            const img = new Image();
            img.src=this.toload[key];
            this.images[key]={
                image:img,
            }
        })
    }
}