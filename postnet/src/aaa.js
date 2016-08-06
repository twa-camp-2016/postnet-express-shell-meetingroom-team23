class user{
     user(name,age){
         this.name = name;
         this.age = age;

     }
     hello(){
         console.log('hello,I am' + this.name);
     }
}

let user1 = new user();
user1.user('aaa',10);

user1.hello();
