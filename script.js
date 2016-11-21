function User (w, password , mail ,ban) 
{
  this.w = w;
  this.ban = ban;
  this.password = password;
  this.mail = mail;
}

function Comment (name, id, text , del,date)
{
  this.name = name;
  this.id = id;
  this.text = text;
  this.del = del;
  this.date = date;
}

function  LogIn() 
{
    var login = document.getElementById('login').value;
    var pas   = document.getElementById('password').value;
    var name = "login" 
    var tmp = login 
    var expires = new Date(); 
    expires.setTime(expires.getTime() + (1000 * 86400 * 365)); 
    if (login === "admin" && pas === "admin") 
    {
      set_cookie(name, tmp, expires); 
      alert("Ви зайшли з правами адміністратора");
      return;
    }
    var arr = JSON.parse(localStorage.getItem("user"));  
    var key,len;
    len = 0;
    if (arr!=null)
      for (var i = 0; i < arr.length; i++) 
      {
        var log = arr[i].w;
        var p   = arr[i].password;
        var b   = arr[i].ban;
        if (log === login && p === pas ) { 
          if (b === "yes" ) 
          {
            alert("Вас забанено") ; return }
            set_cookie("login", tmp, expires); 
            alert("Ви зайшли під ім'ям  "+login);
            return;
          }  
      }
    alert("Не правильный пароль или логин");
}

function Reg() 
{
   var login = document.getElementById('username').value;
   var pas   = document.getElementById('password').value;
   var mail  = document.getElementById('mail').value;
   var arr = JSON.parse(localStorage.getItem("user"));  
   var user = new User(login,pas,mail,"no");
   var key,len;
   len = 0;
   if (login == "admin") 
   {
      alert("Такой пользователь уже есть, выберете другой логин");
      return ;
    }
    if (arr!=null)
    {
      for (var i = 0; i < arr.length; i++) 
      {
        var log = arr[i].w;
        var p   = arr[i].password;
	      var m   = arr[i].mail;
        if (log === login) 
        {
          alert("Логін зарезервований");
          return;
        }
	      else
        {
	        if (m === mail) 
          {
            alert("Пошта зарезервована");
            return;
	         }
        }	
      } 
    }
    if (arr==null) 
    {
      var r =[];
      r.push(user);
      localStorage.setItem("user",JSON.stringify(r));
    } 
	  else 
    {
      arr.push(user);
      localStorage.setItem("user",JSON.stringify(arr));
    }
    var tmp = login 
    var expires = new Date(); 
    expires.setTime(expires.getTime() + (1000 * 86400 * 365)); 
    set_cookie("login",tmp,expires); 
    return;
}

function Com() 
{
  var text = document.getElementById("comment").value;
  var name = get_cookie('login');
  var arr = JSON.parse(localStorage.getItem("comment"));
  var expires = new Date();   
  var id = 0;
  if (arr==null) id = 1 ; 
  else id = arr.length+1;
  len = 0; 
  a  = new String (id);
  var com = new Comment(name,a,text,"no",expires);
  if (arr==null) 
  {
    var r =[];
    r.push(com);
    localStorage.setItem('comment',JSON.stringify(r));
  } 
  else 
  {
    arr.push(com);
    localStorage.setItem('comment',JSON.stringify(arr));     
  }
}

function ban()
{
  var text = document.getElementById("deluser").value;
  var arr = JSON.parse(localStorage.getItem("user"));  
  if (arr!=null) 
  {
    for (var i = 0; i < arr.length; i++) 
    {
         var p = arr[i].w;
         if (p===text) 
         {
          var q = arr[i].ban;
          if (q==="no") arr[i].ban = "yes"; else arr[i].ban = "no";
         }
       
    }
    localStorage.setItem('user',JSON.stringify(arr));
  }         
}

function Delete()
{
  var id = document.getElementById("del").value;
  var arr = JSON.parse(localStorage.getItem("comment"));  
  if (arr!=null)for (var i = 0; i < arr.length; i++) 
  {
    var w = arr[i].id;  
    if (w==id) 
      {
       arr[i].del = "yes";
      }
  }
  comm.innerHTML = comf;
  localStorage.setItem('comment',JSON.stringify(arr));
}