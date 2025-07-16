export async function Submit_login(email:string,password:string):Promise<string>{
    try{
      const response = await fetch('http://localhost:3050/auth/login',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({email,password})
      })
      if(!response.ok){
        throw new Error("Internal Server error")
      }
      const data= await response.json()
      console.log(data['access_token'])
      return data['access_token']
    }catch(err){
      throw new Error("Internal Server Error")
    }
  }
export async function Submit_create_account(name:string,email:string,password:string){
    try{
      const response=await fetch('http://localhost:3050/user/create',{
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify({name,email,password})
      });
      if(!response.ok){
        throw new Error("Internal Server Error")
      }
      const data = await response.json();
      console.log('Login bem-sucedido:', data);
    } catch (err) {
      throw new Error("Internal Server error")
    }
  }
export async function Submit_get_users(token:string){
    try{
      const response= await fetch('http://localhost:3050/user/listall',{
        method:'GET',
        headers:{
          'Content-type':'application/json',
          'Authorization':`Bearer ${token}`,
        }
      })
      const data = await response.json()
      console.log(data)
    }catch(err){

    }
  }