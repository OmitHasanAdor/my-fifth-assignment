const loadissues=()=>{
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res=>res.json())
    .then(data=>console.log(data.data))
}
loadissues()

const displayIssues=(issues)=>{
    const issuesCont=document.getElementById('issuesCont')
     issuesCont=''
    issues.forEach(issue => {

  
    let div=document.createElement('div')
    div.innerHTML=`
<div class="issueCard bg-white rounded-lg shadow-sm p-4 space-y-5">
      <div class="priorityCont flex justify-between items-center mb-4">
        <div class="priority flex justify-start"><img src="./assets/Open-Status.png" alt=""><img
            src="./assets/Closed- Status .png" alt=""></div>
        <div class="">
          <button class="btn btn-soft btn-error">high</button>
          <button class="btn btn-soft hidden">low</button>
          <button class="btn btn-soft btn-warning hidden">Medium</button>

        </div>
      </div>
      <div class="cardBody  mb-3">
        <h3 class=" text-lg font-bold">Fix navigation menu on mobile devices</h3>
        <p class=" text-gray-600 mb-3">The navigation menu doesn't collapse properly on mobile devices...

        </p>
        <button class="btn btn-soft btn-error"><i class="fa-solid fa-bug"></i> Bug</button>
        <button class="btn btn-soft btn-warning"><i class="fa-solid fa-futbol"></i> help wanted</button>
<hr class="mt-4 border border-gray-300">
      </div>
      <div class="author">
        <p class="text-gray-500 ">#1 by john_doe</p>
        <p class="text-gray-500">1/15/2024</p>
      </div>
    </div>
    

    `
      });
    issuesCont.appendChild(div)
}