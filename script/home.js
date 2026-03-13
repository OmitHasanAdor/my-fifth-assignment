let allIssues = [];
let openIssues = [];
let closedIssues = [];

const manageSpinner=(status)=>{
    if (status==true) {
        document.getElementById('spinner').classList.remove('invisible')
        document.getElementById('issuesCont').classList.add('hidden')
    }else{
        document.getElementById('issuesCont').classList.remove('hidden')
        document.getElementById('spinner').classList.add('invisible')

    }
}


const loadModal = (id) => {
  const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    displayModal(data.data)
    console.log(data.data)

  })
}

const displayModal = (issue) => {
  const modalCont = document.getElementById('modalCont');
  modalCont.innerHTML = `

   <div class="">
     <h3 class="font-bold text-xl mb-5">${issue.title}</h3>
  <button class="btn btn-success">${issue.status}</button> <span class=" text-gray-500">${issue.status}ed by ${issue.author}</span> <span class=" text-gray-500">${issue.createdAt ? issue.createdAt.split('T')[0] : ''}</span>
   </div>
    ${issue.labels.map(label => `
            <span class="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[11px] font-medium px-2 py-0.5 rounded-full border border-red-100 whitespace-nowrap">
                <span class="text-[8px]"><i class="fa-solid fa-earth-africa"></i></span>${label}
            </span>
        `).join('')}

        <p class=""> ${issue.description}</p>
        <div class="assign flex justify-between items-center bg-base-200 p-4 rounded-md">
          <div class="assignAuthor">
            <p class=" text-gray-500">Assignee:</p>
            <h3 class=" font-bold">${issue.author}</h3>
          </div>
          <div class="assignpriority">
            <p class=" text-gray-500">Priority:</p>
            <span class="px-3 py-1 rounded text-xs font-bold uppercase ${getPriorityClass(issue.priority)}">
                    ${issue.priority}
                </span>
          </div>
        </div>
  
  `;
document.getElementById('my_modal_5').showModal()
}

const loadissues = () => {
  manageSpinner(true)
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => {
      allIssues = data.data;
      openIssues = allIssues.filter(issue => issue.status.toLowerCase() === 'open');
      closedIssues = allIssues.filter(issue => issue.status.toLowerCase() === 'closed');
      displayIssues(allIssues)
      // count update 
      // updateCounts();

    })
}

// Button-er functionality
const showTab = (type, event) => {
   manageSpinner(true)
  if (type === 'all') displayIssues(allIssues);
  else if (type === 'open') displayIssues(openIssues);
  else if (type === 'closed') displayIssues(closedIssues);

  // Active button styling logic
  updateButtonStyles(event.target);
}


const displayIssues = (issues) => {
     manageSpinner(true)

  const issuesCont = document.getElementById('issuesCont')
  issuesCont.innerHTML = ''
  document.getElementById('issueCountText').innerText = `${issues.length}`;
  issues.forEach(issue => {

    let div = document.createElement('div')
    div.innerHTML = `
<div onclick="loadModal(${issue.id})" class="issueCard h-full flex flex-col bg-white rounded-lg shadow-sm p-4 space-y-5 border-t-4 ${issue.status === 'open' ? 'border-green-500' : 'border-purple-500'}">
      <div class="priorityCont flex justify-between items-center mb-4">
        <div class="priority flex justify-start"><img src="./assets/${issue.status === 'open' ? 'Open-Status.png' : 'Closed- Status .png'}" class="w-5 h-5"></div>
        <div class="">
          <span class="px-3 py-1 rounded text-xs font-bold uppercase ${getPriorityClass(issue.priority)}">
                    ${issue.priority}
                </span>

        </div>
      </div>
      <div class="cardBody  mb-3">
        <h3 class=" text-lg font-bold mb-3">${issue.title}</h3>
        <p class=" text-gray-600 mb-5">${issue.description}</p>
    ${issue.labels.map(label => `
            <span class="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[11px] font-medium px-2 py-0.5 rounded-full border border-red-100 whitespace-nowrap">
                <span class="text-[8px]"><i class="fa-solid fa-earth-africa"></i></span>${label}
            </span>
        `).join('')}
        </div>
        <hr class="mt-4 border border-gray-300">
      <div class="author ">
        <p class="text-gray-500 ">#${issue.id} by ${issue.author}</p>
        <p class="text-gray-500">1/15/2024</p>
      </div>
    </div>
    

    `
    issuesCont.appendChild(div)
  });
  manageSpinner(false)
}


// modals 


const getPriorityClass = (priority) => {
    if (priority === 'high') return 'bg-red-100 text-red-600';
    if (priority === 'medium') return 'bg-orange-100 text-orange-600';
    return 'bg-green-100 text-green-600';
}

const updateButtonStyles = (activeBtn) => {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-white', 'text-blue-600');
    });
    activeBtn.classList.add('bg-blue-600', 'text-white');
    activeBtn.classList.remove('bg-white', 'text-blue-600');
}

loadissues()

document.getElementById('searchBtn').addEventListener('click',()=>{
    // removeActiveClass()
    const input=document.getElementById('searchInput')
    const searchValue=input.value.trim().toLowerCase()

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res=>res.json())
    .then(json=>{
        const allWords=json.data
        const filterWords=allWords.filter(match=>match.title.toLowerCase().includes(searchValue))
        // console.log(filterWords)
        displayIssues(filterWords)
    })
})