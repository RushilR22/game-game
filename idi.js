const canvas=document.querySelector('canvas');
const c=canvas.getContext('2d');


const db=document.querySelector(".db");

canvas.width=1024;
canvas.height=576;


//slicing collisons array
const collisionsMap=[]
for(let i=0;i<collisions.length;i+=100)
{
    collisionsMap.push(collisions.slice(i,i+100))
}


//boundary class and draw class
class Boundary{
    static width=38.4
    static height=38.4
    constructor({position}){
        this.position=position
        this.width=38.4
        this.height=38.4
    }

    draw(){
        c.fillStyle="rgba(0,0,0,0%)"
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}


//drawing boundries
const boundaries=[]

const worker=[]
const plan1=[]
const plan2=[]
const resp=[]
const aryan=[]


// offset of background etc
const offset={
    x:-1430,
    y:-1300
    }


//filtering collisions 
collisionsMap.forEach((row,i)=>{
    row.forEach((symbol,j)=>{
        if(symbol===2423){
             boundaries.push(
                new Boundary({
                    position:{
                        x:j*Boundary.width + offset.x,
                        y:i*Boundary.height +offset.y
                    }
                })
            )
        } 

        if(symbol===6665)
        {
            worker.push(
                new Boundary({
                    position:{
                        x:j*Boundary.width + offset.x,
                        y:i*Boundary.height +offset.y
                    }
                })
            )
        }

        if(symbol===5479)
            {
                plan1.push(
                    new Boundary({
                        position:{
                            x:j*Boundary.width + offset.x,
                            y:i*Boundary.height +offset.y
                        }
                    })
                )
            }
        if(symbol===6535)
        {
            plan2.push(
                new Boundary({
                    position:{
                        x:j*Boundary.width + offset.x,
                        y:i*Boundary.height +offset.y
                    }
                })
            )
        }
        if(symbol===6822)
            {
                resp.push(
                    new Boundary({
                        position:{
                            x:j*Boundary.width + offset.x,
                            y:i*Boundary.height +offset.y
                        }
                    })
                )
            }
        if(symbol===5214)
        {
            aryan.push(
                new Boundary({
                    position:{
                        x:j*Boundary.width + offset.x,
                        y:i*Boundary.height +offset.y
                    }
                })
            )
        }
        
        
    })
})


//background image
const image=new Image();
image.src="./imgs/finial map.png";



//player image
const playerDownImage=new Image();
playerDownImage.src="./imgs/chardown.png";

const playerUpImage=new Image();
playerUpImage.src="./imgs/charup.png";

const playerLeftImage=new Image();
playerLeftImage.src="./imgs/charleft.png";

const playerRightImage=new Image();
playerRightImage.src="./imgs/charright.png";

//creating sprite class for game sprites
class Sprite{
    constructor({position,image,frames={max:1},sprites}){
        this.position=position
        this.image=image
        this.frames={...frames,val:0, elapsed:0}

        this.image.onload=()=>{
            this.width=this.image.width/ this.frames.max
            this.height=this.image.height
        }
        this.moving=false
        this.sprites=sprites
    }
    draw(){
        c.drawImage(this.image, background.position.x, background.position.y);
        c.drawImage(
           this.image, 
            this.frames.val*this.width,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height
        )
        if(this.moving==true)
        {
            if(this.frames.max>1){
                this.frames.elapsed++
            }
            if(this.frames.elapsed%8 ===0)
            {
                if(this.frames.val <this.frames.max-1)
                    this.frames.val++
               else 
               this.frames.val=0
            }     
        }
     
    }
}

//creating player sprite
const player=new Sprite({
    position:{
        x:canvas.width/2,
        y:canvas.height/2
    },
    image:playerDownImage
,
    frames:{
        max:4
    },
    sprites:{
        up: playerUpImage,
        down: playerDownImage,
        left:playerLeftImage,
        right:playerRightImage
    }
})


//background sprite
const background= new Sprite({
    position:{
        x:offset.x,
        y:offset.y
    },
    image:image
});


//key false/true
const keys  ={
    w:{
        pressed:false
    },
    a:{
        pressed:false
    },
    s:{
        pressed:false
    },
    d:{
        pressed:false
    },
    f:{
        pressed:false
    }
}



const movables=[background,...boundaries,...worker,...plan1,...plan2,...resp,...aryan]

function rectcollsion({rect1,rect2}){
    return(
        rect1.position.x +rect1.width >=rect2.position.x &&
        rect1.position.x<=rect2.position.x+rect2.width &&
        rect1.position.y<= rect2.position.y+rect2.height &&
        rect1.position.y+rect1.height >= rect2.position.y
    )
}




// if(keys.f.pressed &&  chars.work)
// {
//     db.innerHTML+="<p>"+dialauges.workers+"</P>"
// }
//animationloop
function animate(){
    window.requestAnimationFrame(animate);


//loading images on to the screen
    //drawing background
    background.draw()

    //drawing boundaries
    boundaries.forEach(boundary=>{
        boundary.draw()
    })

    worker.forEach(boundary=>
    {
        boundary.draw()
    })

    plan1.forEach(boundary=>
        {
            boundary.draw()
        })
    plan2.forEach(boundary=>
    {
        boundary.draw()
    })

    resp.forEach(boundary=>
        {
            boundary.draw()
        })

    aryan.forEach(boundary=>
    {
        boundary.draw()
    })

    // drawing character 
    player.draw()


    let chars={
        work:false,
        resp:false,
        pal1:false,
        pal2:false,
        aryan:false
    }
    
    
dialauges={
workers:`<pre>
construction going on skeedadle kid

I think there might be more rooms to add portals to other plannets.

we arnt that sure tho, we just work for the money hehehe
</pre>`,


aryan:`
<pre>Hey man
Thats an extra terrestrial being
Still tryna figure it out
Communication is kinda tough
<SCHREEEEEEEH>
Yikes! Maybe in the next update we will bring the alien in?</pre>`,


plan1:`<pre>51 Pegasi B


 Oh, it’s a wild place! It’s a giant gas planet, really hot, like frying an egg on the sidewalk!
You’d better keep those eggs away from it! They will start cooking at that temperature!!!
Also, as giant ball of gas with no real atmosphere it’s mostly made of hydrogen and helium, 
so if you ever meet an alien from there, be prepared for some very squeaky and weird voices!


well the portal takes you there but its under construction.....</pre>`,


resp:`<pre>
Welcome to the Nasa space station to explore and learn about the exoplanets closest to us.

our facility is top class(though its under construction right now) and have one of the worlds best scientists  on board with us.

explore at your own pace go to the top rooms and talk to the scientists there to find out more about the planets.

You can talk to one of the developer of the project as well he will be there near the alien (bottom right of the map)
</pre>
`,


plan2:`
<pre>PROXIMA CENTURI B


It is the closest extrasolar planet and might even be habitable from the research done by us humans.
So Proxima Centauri b is believed to be a rocky planet,
similar to Earth, it's bigger in mass than Earth but not as big as the gas giants.
Proxima Centauri b orbits within the habitable zone of its star, Proxima Centauri,
where conditions might allow for liquid water to exist.

well the portal takes you there but its under construction.....
</pre>`
   }


   
//movement 
    let moving=true
    player.moving=false
    

    
    if(keys.f.pressed){
        //workers validity
        for (let i = 0; i < worker.length; i++) 
            {
                const boundary=worker[i]
                if(rectcollsion({
                    rect1:player,
                    rect2:{
                        ...boundary,position:{
                            x:boundary.position.x,
                            y:boundary.position.y
                        }
                    }
                    })
                    )
                    {
                        moving=false
                        chars.work=true
                        console.log(chars.work)
                        db.style.display="block"
                        if(chars.work){
                            db.innerHTML="<p>"+dialauges.workers+"</P"
                        }
                    }     
            }
            //plannet 1 validity
            for (let i = 0; i < plan1.length; i++) 
                {
                    const boundary=plan1[i]
                    if(rectcollsion({
                        rect1:player,
                        rect2:{
                            ...boundary,position:{
                                x:boundary.position.x,
                                y:boundary.position.y
                            }
                        }
                        })
                        )
                        {
                            moving=false
                            chars.work=true
                            console.log(chars.work)
                            db.style.display="block"
                            if(chars.work){
                                db.innerHTML="<p>"+dialauges.plan1+"</P"
                            }
                            
                        }     
                }
            //plannet 2 validity
            for (let i = 0; i < plan2.length; i++) 
                {
                    const boundary=plan2[i]
                    if(rectcollsion({
                        rect1:player,
                        rect2:{
                            ...boundary,position:{
                                x:boundary.position.x,
                                y:boundary.position.y
                            }
                        }
                        })
                        )
                        {
                            moving=false
                            chars.plan2=true
                            db.style.display="block"
                            if(chars.plan2){
                                db.innerHTML="<p>"+dialauges.plan2+"</P"
                            }
                            
                        }     
                }
            
            //respo validity
            for (let i = 0; i < resp.length; i++) 
                    {
                        const boundary=resp[i]
                        if(rectcollsion({
                            rect1:player,
                            rect2:{
                                ...boundary,position:{
                                    x:boundary.position.x,
                                    y:boundary.position.y
                                }
                            }
                            })
                            )
                            {
                                moving=false
                                chars.resp=true
                                db.style.display="block"
                                if(chars.resp){
                                    db.innerHTML="<p>"+dialauges.resp+"</P"
                                }
                                
                            }     
                    }  
            //aryan validity    
            for (let i = 0; i < aryan.length; i++) 
                    {
                        const boundary=aryan[i]
                        if(rectcollsion({
                            rect1:player,
                            rect2:{
                                ...boundary,position:{
                                    x:boundary.position.x,
                                    y:boundary.position.y
                                }
                            }
                            })
                            )
                            {
                                moving=false
                                chars.aryan=true
                                db.style.display="block"
                                if(chars.aryan){
                                    db.innerHTML="<p>"+dialauges.aryan+"</P"
                                }
                                
                            }     
                    }          

        
    }
    else{
        moving=true
        db.style.display="none"
    }

        
        if(keys.w.pressed)
        {
            player.moving=true
            player.image=player.sprites.up
            for (let i = 0; i < boundaries.length; i++) 
            {
                const boundary=boundaries[i]
                if(rectcollsion({
                    rect1:player,
                    rect2:{
                        ...boundary,position:{
                            x:boundary.position.x,
                            y:boundary.position.y+10
                        }
                    }
                    })
                    )
                    {
                      moving=false
                      break;
                    }
            }
                //workers validity
                for (let i = 0; i < worker.length; i++) 
                    {
                        const boundary=worker[i]
                        if(rectcollsion({
                            rect1:player,
                            rect2:{
                                ...boundary,position:{
                                    x:boundary.position.x,
                                    y:boundary.position.y+10
                                }
                            }
                            })
                            )
                            {
                                chars.work=true
                            }
                    }
            
            if(moving){
                movables.forEach(movable => {
                    movable.position.y+=8
                });
            }
           
        }
         else if(keys.a.pressed)
        {
            player.moving=true
            player.image=player.sprites.left
            for (let i = 0; i < boundaries.length; i++) 
                {
                    const boundary=boundaries[i]
                    if(rectcollsion({
                        rect1:player,
                        rect2:{
                            ...boundary,position:{
                                x:boundary.position.x+10,
                                y:boundary.position.y
                            }
                        }
                        })
                        )
                        {
                          moving=false
                          break;
                        }
                }

                
                //workers validity
            for (let i = 0; i < worker.length; i++) 
                {
                    const boundary=worker[i]
                    if(rectcollsion({
                        rect1:player,
                        rect2:{
                            ...boundary,position:{
                                x:boundary.position.x,
                                y:boundary.position.y+10
                            }
                        }
                        })
                        )
                        {
                            chars.work=true
                            
                        }
                }
                if(moving)
                movables.forEach(movable => {
                    movable.position.x+=8
                });
        }
         else if(keys.s.pressed)
        {
            player.moving=true
            player.image=player.sprites.down
            for (let i = 0; i < boundaries.length; i++) 
                {
                    const boundary=boundaries[i]
                    if(rectcollsion({
                        rect1:player,
                        rect2:{
                            ...boundary,position:{
                                x:boundary.position.x,
                                y:boundary.position.y-10
                            }
                        }
                        })
                        )
                        {
                          moving=false
                          break;
                        }
                }

                //workers validity
            for (let i = 0; i < worker.length; i++) 
                {
                    const boundary=worker[i]
                    if(rectcollsion({
                        rect1:player,
                        rect2:{
                            ...boundary,position:{
                                x:boundary.position.x,
                                y:boundary.position.y+10
                            }
                        }
                        })
                        )
                        {
                            chars.work=true
                        }
                }


                if(moving)
            movables.forEach(movable => {
                movable.position.y-=8
            });
        }
         else if(keys.d.pressed)
        {
            player.image=player.sprites.right
            player.moving=true
            for (let i = 0; i < boundaries.length; i++) 
                {
                    const boundary=boundaries[i]
                    if(rectcollsion({
                        rect1:player,
                        rect2:{
                            ...boundary,position:{
                                x:boundary.position.x-10,
                                y:boundary.position.y
                            }
                        }
                        })
                        )
                        {
                          moving=false
                          break;
                        }
                }
                if(moving)
            movables.forEach(movable => {
                movable.position.x-=8
            });
        }
    }
animate()

//listening for keydown
window.addEventListener('keydown',(e)=>{
    switch (e.key){
        case 'w':
      keys.w.pressed = true
      
      break
    case 'a':
      keys.a.pressed = true
      
      break

    case 's':
      keys.s.pressed = true
      
      break

    case 'd':
      keys.d.pressed = true
      
      break
    case 'f':
        if(keys.f.pressed==false)
        keys.f.pressed=true
        else
            keys.f.pressed=false
        break;
    }
})


//listening for keyup
window.addEventListener('keyup',(e)=>{
    switch(e.key){
        case 'w':
            keys.w.pressed=false;
            break;
        case 'a':
            keys.a.pressed=false;
            break;
        case 's':
            keys.s.pressed=false;
            break;
        case 'd':
            keys.d.pressed=false;
            break;
        
    }
})
