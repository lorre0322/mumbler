<script>
import { onMount, createEventDispatcher } from 'svelte'
import request from '../../lib/request' 
import { options} from '../../lib/stores'
let M = $options


let token = localStorage.MToken || ''
let isLogin=false
let meta={
  type: 'LOGIN',
  username: '',
  password: '',
  token: token,
}
let postMum={
  type:'POST_M',
  content:''
}
function autoLogin(){
  // console.log(token);
  if(localStorage.MToken) login()
}
async function login(){
  try{
    const params = {
      url: M.serverURLs,
      data: meta
    }
    console.log(params)
    const result = await request(params)
    if(result.data){
      token = result.data.token
      localStorage.MToken = result.data.token
      isLogin=true
    }
    // console.log(result)
  } catch (err){
    token = ''
    localStorage.MToken = ''
    isLogin=false
    console.log(err);
  }
}
async function logout(){
  token = ''
  localStorage.MToken = ''
  isLogin=false
}
async function sendMumbler(){
  try{
    const result = await request({
      url: M.serverURLs,
      data: postMum
    })
    // console.log(result);
    console.log(postMum);
  }catch(err){
    console.log(err);
  }
}
onMount(() => {
  autoLogin()
})

</script>

<div id="submit">
  {#if isLogin}
  <textarea
    bind:value={postMum.content}
  />
  <button on:click={sendMumbler}> Send </button>
  <div>Lorre</div>
  <button on:click={logout}>登出</button>
{:else}
  <input type="text" id="username" bind:value={meta.username}>
  <input type="text" id="password" bind:value={meta.password}>
  <button on:click={login}>登陆</button>
{/if}
</div>