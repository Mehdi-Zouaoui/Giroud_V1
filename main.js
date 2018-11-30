window.onload = () => {
	let context = window.document.getElementsByTagName("canvas")[0].getContext("2d");
	console.log("Début du code");
	//raccourcis
	var b2World 		  = Box2D.Dynamics.b2World;
	var b2Vec2 			  = Box2D.Common.Math.b2Vec2;
	var b2ContactListener = Box2D.Dynamics.b2ContactListener;
	var b2DebugDraw 	  = Box2D.Dynamics.b2DebugDraw;
	var b2BodyDef		  = Box2D.Dynamics.b2BodyDef;
	var b2Body 			  = Box2D.Dynamics.b2Body;
	var b2FixtureDef 	  = Box2D.Dynamics.b2FixtureDef;
	var b2Fixture 		  = Box2D.Dynamics.b2Fixture;
	var b2CircleShape 	  = Box2D.Collision.Shapes.b2CircleShape;
	var b2PolygonShape 	  = Box2D.Collision.Shapes.b2PolygonShape;
    //var b2AABB = Box2D.Collision.b2AABB;
    /** ... **/
    var keys = [];
    /** ... **/
    

    function CreateCube(_x , _y , width , height){
        
        let cubeBodyDef = new b2BodyDef();
        cubeBodyDef.position.Set(_x/scale,_y/scale);
		cubeBodyDef.type = b2Body.b2_staticBody;
        let cubeBody = world.CreateBody(cubeBodyDef);
         
        let cubefixDef = new b2FixtureDef();
        cubefixDef.shape = new b2PolygonShape();
        cubefixDef.shape.SetAsBox(width/scale, height/scale); 
        cubeBody.CreateFixture(cubefixDef);
    }
    function SensorCreateCube(_x , _y , width , height){
        
        let cubeBodyDef = new b2BodyDef();
        cubeBodyDef.position.Set(_x/scale,_y/scale);
		cubeBodyDef.type = b2Body.b2_staticBody;
        let cubeBody = world.CreateBody(cubeBodyDef);
         
        let cubefixDef = new b2FixtureDef();
        cubefixDef.shape = new b2PolygonShape();
        cubefixDef.shape.SetAsBox(width/scale, height/scale); 

       
        let c =  cubeBody.CreateFixture(cubefixDef);
        c.SetSensor(true);
    }

	function CreateBall(_x,_y,_radius,_density,_restitution){
		//créer la "matière" (b2body) pour la bille
		let billeBodyDef = new b2BodyDef();
		billeBodyDef.position.Set(_x/scale,_y/scale);
		billeBodyDef.type = b2Body.b2_dynamicBody;
		let billeBody = world.CreateBody(billeBodyDef);
		
		//Créer la b2Fixture de la bille
		let billefixDef = new b2FixtureDef();
		billefixDef.shape = new b2CircleShape(_radius/scale);
		billefixDef.density  = _density;
		billefixDef.friction = 10;
		billefixDef.restitution = _restitution;
		
		//création de la fixture
		let billeFix = billeBody.CreateFixture(billefixDef);
		billeFix.SetUserData({name : "bille"});
		
		return billeBody;
	}
	
	function CreateTriangle(_x,_y){
		//créer la "matière" (b2body) pour le triangle
		let triBodyDef = new b2BodyDef();
		triBodyDef.position.Set(_x/scale,_y/scale);
		triBodyDef.type = b2Body.b2_staticBody;
		let triBody = world.CreateBody(triBodyDef);
		
		//Créer la b2Fixture de la bille
		let trifixDef = new b2FixtureDef();
		trifixDef.shape = new b2PolygonShape();
		
		let trifixDef2 = new b2FixtureDef();
		trifixDef2.shape = new b2PolygonShape();
		
		let trifixDef3 = new b2FixtureDef();
		trifixDef3.shape = new b2PolygonShape();
		
		let tabVec = [
			new b2Vec2(0,0),
			new b2Vec2(1,1),
			new b2Vec2(-1,1)
		];
		
		let tabVec2 = [
			new b2Vec2(-1,1),
			new b2Vec2(0,2),
			new b2Vec2(-2,2)
		];
		
		let tabVec3 = [
			new b2Vec2(1,1),
			new b2Vec2(2,2),
			new b2Vec2(0,2)
		];
		
		trifixDef.shape.SetAsArray(tabVec,3);
		trifixDef2.shape.SetAsArray(tabVec2,3);
		trifixDef3.shape.SetAsArray(tabVec3,3);
		
		trifixDef.density  = 1;
		trifixDef.friction = 0.3;
		trifixDef.restitution = 1;
		
		trifixDef2.density  = 1;
		trifixDef2.friction = 0.3;
		trifixDef2.restitution = 1;
		
		trifixDef3.density  = 1;
		trifixDef3.friction = 0.3;
		trifixDef3.restitution = 1;
		
		triBody.CreateFixture(trifixDef);
		triBody.CreateFixture(trifixDef2);
		triBody.CreateFixture(trifixDef3);
		
		triBody.SetAngularVelocity(4);
	}
    
    function the_player (x, y){

        let player = new b2BodyDef();
            player.position.Set(x/scale,y/scale);
            player.type=b2Body.b2_dynamicBody;
        
        let  main_part = new b2PolygonShape();
			 main_part.SetAsOrientedBox(12/scale, 2/scale, new b2Vec2(0,0),0);
            
        let chassis_fixture = new b2FixtureDef();
			chassis_fixture.shape= main_part;
			chassis_fixture.friction=0.9;
			chassis_fixture.density=50;
			chassis_fixture.restitution=0.1;
        
        let fixed_arm = new b2PolygonShape();
			fixed_arm.SetAsOrientedBox(2/scale, 6/scale, new b2Vec2(-8/scale,-4/scale),0);
            
            let fixed_arm_fixture = new b2FixtureDef();
            
                fixed_arm_fixture.shape = fixed_arm;
			    fixed_arm_fixture.friction=0.9;
			    fixed_arm_fixture.density=1;
                fixed_arm_fixture.restitution=0.1;
      
               
			    player_body = world.CreateBody(player);
			    player_body.CreateFixture(chassis_fixture);
                player_body.CreateFixture(fixed_arm_fixture);

                return player_body;
            
        
        
                
               
    }
    /* function grappin (){

        let grappin = new b2PolygonShape();
        grappin.SetAsOrientedBox(new_player.GetPosition(), new b2Vec2(-8/scale,-4/scale),0);
        let grappin_fixture =  new b2FixtureDef();

    }*/
          
    // appuyer sur une touche
    handleKeyDown = function(evt) {
        keys[evt.keyCode] = true;
    }
    // relâcher une touche
    handleKeyUp = function(evt) {
        keys[evt.keyCode] = false;
    }

    // Sauter

    function jump(player) {
               
        let vel = player.GetLinearVelocity();
             vel.y = -200 /scale;
             
       };
       // Effectuer un déplacement vers la droite
    function moveRight(player) {
            
        let vel = player.GetLinearVelocity();
            vel.x = 200 / scale;
            
       };
       // Effectuer un déplacement vers la gakuche
    function moveLeft(player) {
            
        let vel = player.GetLinearVelocity();
            vel.x = -200 / scale;
            
       };    
    function moveDown(player) {
            
        let vel = player.GetLinearVelocity();
            vel.y = 200 / scale;
            
       };    
    
        
       



    // Gérer les interactions
        function handleInteractions() {
    // touche "haut"
            if (keys[38]) {
                    jump(second_new_player);
    }   
            if(keys[90]){
                    jump(new_player);
            }
    // touches "gauche" et "droite"
             if (keys[37]) {
                     moveLeft(second_new_player);
    }  
             if(keys[81]){
                    moveLeft(new_player);
            }    
             if (keys[39]) {
                     moveRight(second_new_player);
    } 
             if ( keys[68]){
                    moveRight(new_player);
            }
             if(keys[40]){
                    moveDown(second_new_player);
             }
             if( keys[83]){
                    moveDown(new_player);
             }
}


	//zoom pour avoir des tailles
	let scale = 10;
	
	//créer le monde
	let gravity = new b2Vec2(0,10);
	var world = new b2World(gravity);
	
	//créer la "matière" pour le sol
    let groundBodyDef = new b2BodyDef();
    let groundBodyDef_right = new b2BodyDef();
    let groundBodyDef_left = new b2BodyDef();
    let roofBodyDef = new b2BodyDef();
    
    roofBodyDef.position.Set(0/scale ,10/scale );
    roofBodyDef.type = b2Body.b2_staticBody;
    let roofBody = world.CreateBody(roofBodyDef);

    groundBodyDef.position.Set(0/scale,600/scale);
	groundBodyDef.type = b2Body.b2_staticBody;
    let groundBody = world.CreateBody(groundBodyDef);
    
    groundBodyDef_right.position.Set(0/scale,600/scale);
	groundBodyDef_right.type = b2Body.b2_staticBody;
    let groundBody_right = world.CreateBody(groundBodyDef_right);
    
    groundBodyDef_left.position.Set(800/scale,600/scale);
	groundBodyDef_left.type = b2Body.b2_staticBody;
	let groundBody_left = world.CreateBody(groundBodyDef_left);
	
	//Créer la fixture du sol
    let fixDef = new b2FixtureDef();
    let fixDef_right = new b2FixtureDef();
    let fixDef_left = new b2FixtureDef();
    let fixDef_roof = new b2FixtureDef();
    //fixDef.shape = new b2CircleShape(50);
	fixDef.friction = 100;
	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(1000/scale, 100/scale);
    groundBody.CreateFixture(fixDef);
    
    fixDef_right.friction = 100;
	fixDef_right.shape = new b2PolygonShape();
	fixDef_right.shape.SetAsBox(10/scale, 1000/scale);
    groundBody_right.CreateFixture(fixDef_right);
    
    fixDef_left.friction = 100;
	fixDef_left.shape = new b2PolygonShape();
	fixDef_left.shape.SetAsBox(10/scale, 1000/scale);
    groundBody_left.CreateFixture(fixDef_left);
    
    fixDef_roof.friction = 100;
    fixDef_roof.shape =  new b2PolygonShape();
    fixDef_roof.shape.SetAsBox(1000/scale, 10/scale);
    roofBody.CreateFixture(fixDef_roof);

	
	//Ajout des objets dynamiques
	//b est le b2body de la bille
    let b = CreateBall(360,100,50/scale,1,0.8);
    for( let i = 100 ; i < 700 ; i+= 80){

     CreateTriangle( i ,  500/scale);
    
    };
    CreateCube(50 ,500,20/scale,600/scale);
    SensorCreateCube(29,500 , 175/scale, 600/scale);
        
    
    
    CreateCube(750,500,20/scale,600/scale);
    SensorCreateCube(772,500 , 175/scale, 600/scale);
    let new_player = the_player(100 , 480);
    let second_new_player = the_player( 700 , 480);
    
	//let force = new b2Vec2(1,0);
	//let point = b.GetPosition();
	//b.ApplyImpulse(force, point);
	
	//collision avec le sol
	//on crée un listener
   
		
		//on impulse vers la droite
		let force = new b2Vec2(1,0);
		let point = b.GetPosition();
		b.ApplyImpulse(force, point);
	
	
	
	//préparer la simulation
	let timeStep = 1/60;	
	
	// Définir la méthode d'affichage du débug
	var debugDraw = new b2DebugDraw();
	// Définir les propriétés d'affichage du débug
	debugDraw.SetSprite(context);      // contexte
	debugDraw.SetFillAlpha(0.3);       // transparence
	debugDraw.SetLineThickness(1.0);   // épaisseur du trait
	debugDraw.SetDrawScale(scale); 	   //zoom sur l'affichage
	// Affecter la méthode de d'affichage du débug au monde 2dbox
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
	
	window.setInterval(()=>{
		world.Step(timeStep,10,10);
		world.DrawDebugData();
        world.ClearForces();
         // gérer les interactions
         handleInteractions();
    
		//let pos = billeBody.GetPosition();
		//console.log(pos.y);
	},100/6);
};