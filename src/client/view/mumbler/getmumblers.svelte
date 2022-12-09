<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import request from '../../lib/request' 
  import { options} from '../../lib/stores'

  let M = $options
  export let getMum = []
  let pageNo=1,
  getMums=[]

  $: {
    getMums = [...getMum, ...getMums]
  }
  async function getMumbler(){
    try {
      const result = await request({
        url: M.serverURLs,
        data: {
          type:'GET_M',
          page:pageNo
        }
      })
      // console.log(pageNo);
      var con=result.data.map(item=>{
        return item.md
      })
      getMums=result.data
      console.log(getMums);
    } catch (error) {
      console.log(error);
    }
  }
  async function onMoreMumbler() {
      pageNo++
      await getMumbler()
  }
onMount(() => {
  getMumbler()
})
</script>
<div id="mumblers">
  {#each getMums as getMum}
  <div id={getMum.id}>{@html getMum.html}</div>
  {/each}
  <button id="mumbler-more" on:click={onMoreMumbler}>more</button>
</div>