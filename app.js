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
  descInfo = document.querySelector("description"),
  travelArray = JSON.parse(localStorage.getItem("travel") || "[]"),
  householdArray = JSON.parse(localStorage.getItem("household") || "[]"),
  totalBudget = localStorage.getItem("totalBudget") || 0,
  addCostRegBtn = document.querySelectorAll('.addCostReg'),
  categoryCost = document.querySelector('#expenseCat'),
  categoryCost2 = categoryCost.getElementsByTagName('button'),
  backBtn = document.querySelectorAll('.backHome'),
  categoryDiv = document.querySelectorAll('.category'),
  categoryCostChildCount = categoryCost2.length;
  console.log(backBtn);


// add this functionality to NodeList for we can add event handler for nodelist
  NodeList.prototype.addEventListener = function (event_name, callback, useCapture)
{
    for (var i = 0; i < this.length; i++)
    {
      this[i].addEventListener(event_name, callback, useCapture);
    }
};
  
// to change display 
for(i = 0 ; i< 5 ;i++ ){
  // replace into the name of button to id div category
  divCostReg = categoryCost2[i].id.replace('Btn', 'Category');
  // event for every button clicked changing display that div
  categoryCost2[i].addEventListener('click' , function(){
    let show = document.getElementById(`${divCostReg}`);
    show.style.display = "flex";
    travelManagement.style.display = "none";
  })

}


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

  }
});
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

backBtn.addEventListener("click", function () {
  travelManagement.style.display = "none";
  createHousehold.style.display = "flex";
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
        }
      }
    }
  }
  // method create member
  addMemberOfHousehold() {
    localStorage.setItem();
    //  const member = document.createElement('option');
    //  member.innerText= fullName;
    //  getHousehold.appendChild(member).append(fullName);
    //  getFoodHousehold.appendChild(member);
    //  getEntHousehold.appendChild(member);
    //  getRoomHousehold.appendChild(member);
    //  getOtherHousehold.appendChild(member);
    //  getTransportHousehold.appendChild(member);
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
    if (typeof newWalletAmount.value == "number" || !newWalletAmount.value) {
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
