//selectors

let destination = document.querySelector("#destination"),
  passenger = document.querySelector("#passenger"),
  startDate = document.querySelector("#startDate"),
  endDate = document.querySelector("#endDate"),
  createTravelBtn = document.querySelector("#createTravelBtn"),
  createTravelForm = document.querySelector("#createTravelForm"),
  desc = document.querySelector("#desc"),
  getHousehold = document.querySelector("#household"),
  memberName = document.querySelector("#memberName"),
  memberWallet = document.querySelector("#memberWallet"),
  travelData = document.querySelector("#travelData"),
  travelManagement = document.querySelector("#travelManagement"),
  createMemberBtn = document.querySelector("#BtnCreateHousehold"),
  createNewHousehold = document.querySelector("#createNewHousehold"),
  createHousehold = document.querySelector("#createHousehold"),
  submitHousehold = document.querySelector("#submitHousehold"),
  totalBudgetAmount = document.querySelector("#totalBudgetAmount"),
  addToBudgetForm = document.querySelector("#addToBudgetForm"),
  addToBudgetBtn = document.querySelector("#addToBudgetBtn"),
  addToBudget = document.querySelector("#addToBudget"),
  newWalletAmount = document.querySelector("#newWallet"),
  householdBudgetForm = document.querySelector("#householdBudgetForm"),
  delBtn = document.querySelector("#delBtn"),
  getFoodHousehold = document.querySelector("#getFoodHousehold"),
  getEntHousehold = document.querySelector("#getEntHousehold"),
  getTransportHousehold = document.querySelector("#getTransportHousehold"),
  getRoomHousehold = document.querySelector("#getRoomHousehold"),
  getOtherHousehold = document.querySelector("#getOtherHousehold"),
  memberOfHousehold = document.querySelector("#memberOfHousehold"),
  descInfo = document.querySelector("description"),
  travelArray = JSON.parse(localStorage.getItem("travel") || "[]"),
  householdArray = JSON.parse(localStorage.getItem("household") || "[]"),
  totalBudget = localStorage.getItem("totalBudget") || 0,
  addCostRegBtn = document.querySelectorAll('.addCostReg'),
  categoryCost = document.querySelector('#expenseCat'),
  // categoryCost2 = categoryCost.getElementsByTagName('button'),
  categoryCost2 = document.querySelectorAll('.categoryBtn'),
  backBtn = document.querySelectorAll('.backHome'),
  categoryDiv = document.querySelectorAll('.category'),
  householdSelect = document.querySelectorAll('.household'),
  foodCat = document.querySelector("#foodCategory"),
  entCat = document.querySelector("#entCategory"),
  transportCat = document.querySelector("#transportCategory"),
  roomCat = document.querySelector("#roomCategory"),
  otherCat = document.querySelector("#othersCategory"),
  foodCost = document.querySelector("#foodCost"),
  entertainmentCost = document.querySelector("#entertainmentCost"),
  transportCost = document.querySelector("#transportCost"),
  roomCost = document.querySelector("#roomCost"),
  otherCost = document.querySelector("#otherCost"),
  foodTitle = document.querySelector("#foodTitle"),
  entertainmentTitle = document.querySelector("#enertainmentTitle"),
  transportTitle = document.querySelector("#transportTitle"),
  roomTitle = document.querySelector("#roomTitle"),
  otherTitle = document.querySelector("#otherTitle"),
  categoryCostChildCount = categoryCost2.length;

// add this functionality to NodeList for we can add event handler for nodelist
  NodeList.prototype.addEventListener = function (event_name, callback, useCapture)
{
    for (var i = 0; i < this.length; i++)
    {
      this[i].addEventListener(event_name, callback, useCapture);
    }
};
// eventListeners
// check if travel exist
document.addEventListener("DOMContentLoaded", function () {
  if (travelArray.length === 0) {
    createTravel.style.display = "flex";
} else {
      new UserInterface().showManagement();
      
    for (let i = 0; i < travelArray.length; i++) {
      const infoSpan = document.querySelectorAll(".infoSpan");
      infoSpan[i].append(` ${travelArray[i]} `);
    }
    descInfo = localStorage.getItem("description");
    document.querySelector("#travelInfo p").append(` ${descInfo} `);
    totalBudgetAmount.append(` ${totalBudget} `);
    new Household().addMemberOfHousehold();
  }
});
// food display
document.querySelector("#foodBtn").addEventListener("click" , function(e){
  new UserInterface().foodCategory();
  e.preventDefault()
})
document.querySelector("#foodSub").addEventListener("click" , function(e){
  new Expense().food()
  e.preventDefault()
})
// ent display
document.querySelector("#entBtn").addEventListener("click" , function(e){
  new UserInterface().entCategory();
  e.preventDefault();
})
// transport display
document.querySelector("#transportBtn").addEventListener('click', function(e){
  new UserInterface().transportCategory();
  e.preventDefault();
})
// room display
document.querySelector("#roomBtn").addEventListener("click" , function(e){
  new UserInterface().roomCategory();
  e.preventDefault();
})
// other display
document.querySelector("#othersBtn").addEventListener("click" , function(e){
  new UserInterface().otherCategory();
  e.preventDefault();
})
// createTravel
createTravelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const newTravel = new Travel().createTravel();
});

// create Member Household
createMemberBtn.addEventListener("submit", function (e) {
  e.preventDefault();

  new Household().createMember();
});

addToBudget.addEventListener("click", function () {
  new Budget().addToBudget();
});
addToBudgetBtn.addEventListener("click", function () {
  new Budget().addToWallet();
});
delBtn.addEventListener("click", function () {
  window.localStorage.clear();
  location.reload();
  // createTravel.style.display = "flex";
  // travelManagement.style.display = "none";
});
createNewHousehold.addEventListener("click", function () {
  travelManagement.style.display = "none";
  createHousehold.style.display = "flex";
});
submitHousehold.addEventListener("submit", function(e){
  e.preventDefault();
  new Household().createMember();
})

backBtn.addEventListener("click", function () {
  for(i = 0 ; i<categoryDiv.length ; i++){
    categoryDiv[i].style.display = 'none';
    travelManagement.style.display = 'flex';
  }
});

class UserInterface {
  constructor() {}

  // display MessageBox
  displayErrorMsg(msg, parent, child) {
    // create message box
    const MessageBox = document.createElement("div");
    MessageBox.innerText = msg;
    MessageBox.classList = "error";
    // show message
    parent.insertBefore(MessageBox, child);

    // remove message box
    setTimeout(function () {
      MessageBox.remove();
    }, 6000);
  }
  showManagement() {
    createTravel.style.display = "none";
    travelManagement.style.display = "flex";
  }
  foodCategory(){
    // food category diplay
    if(foodCat.style.display != "ex"){
      foodCat.style.display = 'flex';
      travelManagement.style.display = "none";
    }
  }
  entCategory(){
    // ent category display
    if(entCat.style.display != "ex"){
      entCat.style.display = 'flex';
      travelManagement.style.display = "none";
    }
  }
  transportCategory(){
    // transport category display
    if(transportCat.style.display != "ex"){
      transportCat.style.display = 'flex';
      travelManagement.style.display = "none";
    }
  }
  roomCategory(){
    // room category display
    if(roomCat.style.display != "ex"){
      roomCat.style.display = 'flex';
      travelManagement.style.display = "none";
    }
  }
  otherCategory(){
    // other category display
    if(otherCat.style.display != "ex"){
      otherCat.style.display = 'flex';
      travelManagement.style.display = "none";
    }
  }
}
class Travel {
  constructor() {}

  // methods
  // method create travel
  createTravel() {
    if (
      !desc.value ||
      !destination.value ||
      !passenger.value ||
      !startDate.value ||
      !endDate.value
    ) {
      const parent01 = document.querySelector("#createTravelForm"),
        child01 = document.querySelector("#createTravelForm label");
      new UserInterface().displayErrorMsg(
        ` لطفا همه ی فیلد ها را پر کنید. `,
        parent01,
        child01
      );
    } else {
      let newTravelInfo = document.querySelectorAll("#createTravelForm input");

      for (let i = 0; i < newTravelInfo.length; i++) {
        const infoSpan = document.querySelectorAll(".infoSpan");
        infoSpan[i].append(newTravelInfo[i].value);
        travelArray.push(newTravelInfo[i].value);
        console.log(travelArray);
        localStorage.setItem("travel", JSON.stringify(travelArray));
      }
      let newTravelDesc = document.querySelector("#createTravelForm textarea");
      document.querySelector("#travelInfo p").append(newTravelDesc.value);
      localStorage.setItem("description", newTravelDesc.value);
      createTravelForm.reset();
      new UserInterface().showManagement();
    }
  }
}

class Household {
  constructor() {}

  // methods
  // method create member
  addMemberOfHousehold() {
    for (let i = 0; i < householdArray.length; i++) {
      console.log(householdArray[i]);
      const tag = document.createElement('option');
     
      tag.value=householdArray[i];
      tag.innerText=householdArray[i];
      getHousehold .appendChild(tag);
      getFoodHousehold.appendChild(tag);
      // getEntHousehold.appendChild(tag);
      // getRoomHousehold.appendChild(tag);
      // getOtherHousehold.appendChild(tag);
      // getTransportHousehold.appendChild(tag);

    const listTag = document.createElement('li'),
    memberName = document.createElement('span'),
    memberBudget = document.createElement('span'),
    memberState = document.createElement('span');
    const orderList = document.querySelector('#memberOfHousehold ol');
    orderList.appendChild(listTag);
    listTag.classList.add("member");
    memberName.classList.add( "memberName");
    memberBudget.classList.add("memberBudget");
    memberState.classList.add("memberState");
    memberName.innerText = householdArray[i];
    listTag.append(memberName);
    listTag.append(memberBudget);
    listTag.append(memberState);
    }
  }


  createMember() {
    // read value from form
    let fullName = memberName.value;

    // check the value of fields are correct
    if (fullName === "") {
      new UserInterface().displayErrorMsg(
        `  لطفا همه ی فیلد ها را پر کنید. `,
        createMemberBtn,
        document.querySelector("#BtnCreateHousehold input")
      );
    } else {
      if (fullName === "") {
        new UserInterface().displayErrorMsg(
          `  لطفا نام خانوار را وارد نمایید. `,
          createMemberBtn,
          document.querySelector("#BtnCreateHousehold input")
        );
      } else {
        if (householdArray.includes(fullName)) {
          new UserInterface().displayErrorMsg(
            ` این خانوار از قبل وجود دارد. `,
            createMemberBtn,
            document.querySelector("#BtnCreateHousehold input")
          );
        } else {
          householdArray.push(fullName);
          console.log(householdArray);
          localStorage.setItem("household", JSON.stringify(householdArray));

          new Household().addMemberOfHousehold(getHousehold);
          // new Household().householdBudgetState();

        }
      }
    }
  }

  // household budget state 
  householdBudgetState(){
    


  }
  
}
class Budget {
  constructor() {}
  // methods
  // add to budget btn
  addToBudget() {
    addToBudgetForm.style.display = "block";
    addToBudget.disabled = true;
  }
  // adding to wallet
  addToWallet() {
    if (typeof newWalletAmount.value == "number" || !newWalletAmount.value || getHousehold.value =="") {
      const budgetFormChild = document.querySelector("#addToBudgetForm label");
      new UserInterface().displayErrorMsg(
        `لطفا مقادیر را به درستی وارد کنید.`,
        addToBudgetForm,
        budgetFormChild
      );
    } else {
      const newAmount = Number(newWalletAmount.value);
      new Budget().budgetAmount(newAmount);
      newWalletAmount.value = "";
      addToBudget.disabled = false;
      addToBudgetForm.style.display = "none";
      location.reload();
    }
  }
  // total budget
  budgetAmount(budget) {
    totalBudget = Number(totalBudget) + budget;
    localStorage.setItem("totalBudget", totalBudget);
    return totalBudget;
  }  
}
class Expense {
  constructor(){}
  
  food(){
    if(typeof foodCost.value == "number" || !foodCost.value || getFoodHousehold.value == "" || foodTitle.value == ""){
      let parent = document.querySelector("#food"),
      child = document.querySelector("#food label");
      new UserInterface().displayErrorMsg(`لطفا مقادیر را به درستی وارد کنید.`,parent , child)
    }else{
      const newExpense = Number(foodCost.value);
      const householdNewEx = getFoodHousehold.value;
      const householdNewExTitle = foodTitle.value;
      console.log(typeof(householdNewExTitle));
    }
  }
  enertainment(){

  }
  transport(){

  }
  room(){

  }
  other(){

  }
}
