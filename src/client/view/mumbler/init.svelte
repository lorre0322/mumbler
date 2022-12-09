<script>
  import { onMount, afterUpdate, createEventDispatcher, tick } from 'svelte'
  import { options} from '../../lib/stores'
  import request from '../../lib/request' 
  
  let M = $options
  
  // console.log(M);
  async function onSend(){
    try{
      const comment = {
        type: 'INIT',
        username: 'lorre',
        password: 'wasd33259181',
        mail:'693739563@qq.com'
      }
      const result = await request({
        url: M.serverURLs,
        data: comment
      })
      console.log(result)
    } catch (err){
      console.log(err);
    }
  }
</script>

<div class="M-submit">
  <button class="M-btn" on:click={onSend}>发送</button>
</div>