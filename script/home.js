let allIssues = [];
let openIssues = [];
let closedIssues = [];

window.updateButtonStyles = (clickedBtn) => {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active-color'));
    
    clickedBtn.classList.add('active-color');
}

const loadModal = () => {
  
}

const loadissues = () => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => {
      allIssues = data.data;
      openIssues = allIssues.filter(issue => issue.status.toLowerCase() === 'open');
      closedIssues = allIssues.filter(issue => issue.status.toLowerCase() === 'closed');
      displayIssues(allIssues)
      // count update 
      updateCounts();

    })
}

// Button-er functionality
const showTab = (type, event) => {
  if (type === 'all') displayIssues(allIssues);
  else if (type === 'open') displayIssues(openIssues);
  else if (type === 'closed') displayIssues(closedIssues);

  // Active button styling logic
  updateButtonStyles(event.target);
}


const displayIssues = (issues) => {
  const issuesCont = document.getElementById('issuesCont')
  issuesCont.innerHTML = ''
  document.getElementById('issueCountText').innerText = `${issues.length} Issues`;
  issues.forEach(issue => {

    let div = document.createElement('div')
    div.innerHTML = `
<div class="issueCard h-full flex flex-col bg-white rounded-lg shadow-sm p-4 space-y-5">
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
}


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