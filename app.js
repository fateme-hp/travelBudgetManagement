//selectors
// to select create travel elements
let destination = document.querySelector("#destination"),
  passenger = document.querySelector("#passenger"),
  startDate = document.querySelector("#startDate"),
  endDate = document.querySelector("#endDate"),
  createTravelBtn = document.querySelector("#createTravelBtn"),
  createTravelForm = document.querySelector("#createTravelForm"),
  desc = document.querySelector("#desc"),
  // to select travel management elements
  travelData = document.querySelector("#travelData"),
  descInfo = document.querySelector("description"),
  travelManagement = document.querySelector("#travelManagement"),
  // to select create household elements
  getHousehold = document.querySelector("#household"),
  memberName = document.querySelector("#memberName"),
  memberWallet = document.querySelector("#memberWallet"),
  createMemberBtn = document.querySelector("#BtnCreateHousehold"),
  createNewHousehold = document.querySelector("#createNewHousehold"),
  createHousehold = document.querySelector("#createHousehold"),
  submitHousehold = document.querySelector("#submitHousehold"),
  // to select add budget elements
  totalBudgetAmount = document.querySelector("#totalBudgetAmount"),
  addToBudgetForm = document.querySelector("#addToBudgetForm"),
  addToBudgetBtn = document.querySelector("#addToBudgetBtn"),
  addToBudget = document.querySelector("#addToBudget"),
  newWalletAmount = document.querySelector("#newWallet"),
  householdBudgetForm = document.querySelector("#householdBudgetForm"),
  budgetFormChild = document.querySelector("#addToBudgetForm label"),
  // to select delete button
  delBtn = document.querySelector("#delBtn"),
  // to select categories of household
  getFoodHousehold = document.querySelector("#getFoodHousehold"),
  getEntHousehold = document.querySelector("#getEntHousehold"),
  getTransportHousehold = document.querySelector("#getTransportHousehold"),
  getRoomHousehold = document.querySelector("#getRoomHousehold"),
  getOtherHousehold = document.querySelector("#getOtherHousehold"),
  memberOfHousehold = document.querySelector("#memberOfHousehold"),
  // local storage
  // local storage arrays
  travelArray = JSON.parse(localStorage.getItem("travel") || "[]"),
  householdArray = JSON.parse(localStorage.getItem("household") || "[]"),
  memberBudgetArray = JSON.parse(localStorage.getItem("memberBudget") || "[]"),
  totalBudget = localStorage.getItem("totalBudget") || 0,
  totalExpense = localStorage.getItem("totalExpense") || 0,
  memberExpenseArray = localStorage.JSON.parse(localStorage.getItem("memberExpenses") || "[]"),
  //  categories and expenses
  addCostRegBtn = document.querySelectorAll(".addCostReg"),
  categoryCost = document.querySelector("#expenseCat"),
  categoryCost2 = document.querySelectorAll(".categoryBtn"),
  backBtn = document.querySelectorAll(".backHome"),
  categoryDiv = document.querySelectorAll(".category"),
  householdSelect = document.querySelectorAll(".household"),
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
  entertainmentTitle = document.querySelector("#entertainmentTitle"),
  transportTitle = document.querySelector("#transportTitle"),
  roomTitle = document.querySelector("#roomTitle"),
  otherTitle = document.querySelector("#otherTitle"),
  condition = document.querySelector("#condition"),
  foodSub = document.querySelector("#foodSub"),
  entertainmentSub = document.querySelector("#entertainmentSub"),
  transportSub = document.querySelector("#transportSub"),
  roomSub = document.querySelector("#roomSub"),
  otherSub = document.querySelector("#otherSub"),
  exArray = JSON.parse(localStorage.getItem("exArray") || "[]");
categoryCostChildCount = categoryCost2.length;

// add this functionality to NodeList for we can add event handler for nodelist
NodeList.prototype.addEventListener = function (
  event_name,
  callback,
  useCapture
) {
  for (var i = 0; i < this.length; i++) {
    this[i].addEventListener(event_name, callback, useCapture);
  }
};

// eventListeners

// check if travel exist
// check Travel array length if it's more than 0
// that means travel exist => show travel management
// and add travel info from local storage
// if travel array length is 0
// create new Travel => show create travel
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
    new Household().addMemberOfFoodCat();
    new Household().addMemberOfEntCat();
    new Household().addMemberOfTransportCat();
    new Household().addMemberOfRoomCat();
    new Household().addMemberOfOthersCat();
  }
});

// food display
document.querySelector("#foodBtn").addEventListener("click", function (e) {
  new UserInterface().foodCategory();
  e.preventDefault();
});
// ent display
document.querySelector("#entBtn").addEventListener("click", function (e) {
  new UserInterface().entCategory();
  e.preventDefault();
});
// transport display
document.querySelector("#transportBtn").addEventListener("click", function (e) {
  new UserInterface().transportCategory();
  e.preventDefault();
});
// room display
document.querySelector("#roomBtn").addEventListener("click", function (e) {
  new UserInterface().roomCategory();
  e.preventDefault();
});
// other display
document.querySelector("#othersBtn").addEventListener("click", function (e) {
  new UserInterface().otherCategory();
  e.preventDefault();
});
foodSub.addEventListener("click", function (e) {
  e.preventDefault();
  new Expense().food();
});

entertainmentSub.addEventListener("click", function (e) {
  e.preventDefault();
  new Expense().enertainment();
});

transportSub.addEventListener("click", function (e) {
  e.preventDefault();
  new Expense().transport();
});

roomSub.addEventListener("click", function (e) {
  e.preventDefault();
  new Expense().room();
});

otherSub.addEventListener("click", function (e) {
  e.preventDefault();
  new Expense().other();
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
// show add budget input
addToBudget.addEventListener("click", function () {
  new Budget().addToBudget();
});
// add budget to wallet
addToBudgetBtn.addEventListener("click", function () {
  new Budget().addToWallet();
});

// delete travel
delBtn.addEventListener("click", function () {
  window.localStorage.clear();
  location.reload();
  // createTravel.style.display = "flex";
  // travelManagement.style.display = "none";
});

//  show household form
createNewHousehold.addEventListener("click", function () {
  travelManagement.style.display = "none";
  createHousehold.style.display = "flex";
});
//  add new household
submitHousehold.addEventListener("submit", function (e) {
  e.preventDefault();
  new Household().createMember();
});
//  go back button
backBtn.addEventListener("click", function () {
  for (i = 0; i < categoryDiv.length; i++) {
    categoryDiv[i].style.display = "none";
    travelManagement.style.display = "flex";
  }
});
condition.addEventListener("click", function () {
  // example.style.display = "flex";
  // travelManagement.style.display = "none";
  let householdSelected = household.options[household.selectedIndex].value;
  new Household().condition(householdSelected);
});

// class
//  interface display
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

  //  show travel management on load
  showManagement() {
    createTravel.style.display = "none";
    travelManagement.style.display = "flex";
  }
  foodCategory() {
    // food category diplay
    if (foodCat.style.display == "") {
      foodCat.style.display = "flex";
      travelManagement.style.display = "none";
    }
  }
  entCategory() {
    // ent category display
    if (entCat.style.display == "") {
      entCat.style.display = "flex";
      travelManagement.style.display = "none";
    }
  }
  transportCategory() {
    // transport category display
    if (transportCat.style.display == "") {
      transportCat.style.display = "flex";
      travelManagement.style.display = "none";
    }
  }
  roomCategory() {
    // room category display
    if (roomCat.style.display == "") {
      roomCat.style.display = "flex";
      travelManagement.style.display = "none";
    }
  }
  otherCategory() {
    // other category display
    if (otherCat.style.display == "") {
      otherCat.style.display = "flex";
      travelManagement.style.display = "none";
    }
  }
}

class Travel {
  constructor() {}

  // methods
  // create travel  method
  // check if all the fields are filled
  //  if there is an empty field => show error message
  //  if all the fields are filled => add data to travel data
  //  and show travel management
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
  //  create member method
  //  check local storage and add household to household select input
  addMemberOfHousehold() {
    for (let i = 0; i < householdArray.length; i++) {
      const tag = document.createElement("option");
      tag.value = householdArray[i];
      tag.innerText = householdArray[i];
      getHousehold.appendChild(tag);

      const orderList = document.querySelector("#memberOfHousehold ol");
      const listTag = document.createElement("li"),
        memberName = document.createElement("span"),
        memberBudget = document.createElement("span"),
        memberState = document.createElement("span");
      orderList.appendChild(listTag);
      listTag.classList.add("member");
      memberState.classList.add("memberState");
      memberBudget.classList.add("memberBudget");
      memberName.classList.add("memberName");
      memberName.innerText = householdArray[i];
      memberBudget.innerText = memberBudgetArray[i].newAmount;
      listTag.append(memberName);
      listTag.append(memberBudget);
      listTag.append(memberState);
    }
  }
  //  household Of food category
  addMemberOfFoodCat() {
    for (let i = 0; i < householdArray.length; i++) {
      const tag = document.createElement("option");
      tag.value = householdArray[i];
      tag.innerText = householdArray[i];
      getFoodHousehold.appendChild(tag);
    }
  }
  //  household Of food category
  addMemberOfEntCat() {
    for (let i = 0; i < householdArray.length; i++) {
      const tag = document.createElement("option");
      tag.value = householdArray[i];
      tag.innerText = householdArray[i];
      getEntHousehold.appendChild(tag);
    }
  }

  //  household Of food category
  addMemberOfTransportCat() {
    for (let i = 0; i < householdArray.length; i++) {
      const tag = document.createElement("option");
      tag.value = householdArray[i];
      tag.innerText = householdArray[i];
      getTransportHousehold.appendChild(tag);
    }
  }
  //  household Of food category
  addMemberOfRoomCat() {
    for (let i = 0; i < householdArray.length; i++) {
      const tag = document.createElement("option");
      tag.value = householdArray[i];
      tag.innerText = householdArray[i];
      getRoomHousehold.appendChild(tag);
    }
  }
  //  household Of food category
  addMemberOfOthersCat() {
    for (let i = 0; i < householdArray.length; i++) {
      const tag = document.createElement("option");
      tag.value = householdArray[i];
      tag.innerText = householdArray[i];
      getOtherHousehold.appendChild(tag);
    }
  }

  // create household Method
  // read value from form
  // check if value of fields exist
  // if there isn't any => show error message
  // else check if the member exist
  // if household exist => show error message
  // else add household to local storage and household select input
  createMember() {
    let fullName = memberName.value;

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
        }
      }
    }
  }

  // household Condition
  condition(household) {}
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
  // check if fields are filled correctly
  // if there is a problem => show error message
  // else add amount to total budget & household budget
  addToWallet() {
    if (
      typeof newWalletAmount.value == "number" ||
      !newWalletAmount.value ||
      !getHousehold.value
    ) {
      new UserInterface().displayErrorMsg(
        `لطفا مقادیر را به درستی وارد کنید.`,
        addToBudgetForm,
        budgetFormChild
      );
    } else {
      const newAmount = Number(newWalletAmount.value);
      new Budget().memberBudget(newAmount);
      new Budget().budgetAmount(newAmount);
      newWalletAmount.innerText = "";
      addToBudget.disabled = false;
      addToBudgetForm.style.display = "none";
    }
  }

  // total budget
  //  get new budget amount and add it to total budget
  budgetAmount(budget) {
    totalBudget = Number(totalBudget) + budget;
    localStorage.setItem("totalBudget", totalBudget);
    return totalBudget;
  }

  // برای محاسبه بودجه به ازای هر شخص
  memberBudget(budgetAmount) {
    // آبجکتی از مقدار های ثبت شده توسط کاربر می سازیم
    let member = {
      memberName: getHousehold.value,
      newAmount: budgetAmount,
    };
    // میخوایم بررسی کنیم آیا خانوار از قبل بودجه ای داشته یا خیر ؟
    //  یک متغییر میسازیم که درون آن آرایه بودجه خانوار را بگیرد و
    //   آرایه ای از اسامی اشخاصی که بودجه ثبت کردن ایجاد کند
    const users = new Map(memberBudgetArray.map((e) => [e.memberName, e]));
    console.log(users);
    // اگر شخص مورد نظر ما در آرایه بالا نبود
    if (!users.has(member.memberName)) {
      // آبجکت شخص را به آرایه بودجه خانوار اضافه کن
      memberBudgetArray.push(member);
      // آرایه بودجه خانوار را به لوکال استورج اضافه کن
      localStorage.setItem("memberBudget", JSON.stringify(memberBudgetArray));
    } else {
      //   اگر شخص از قبل بودجه داشته ایندکس آرایه آن را پیدا کن
      //Find index of specific object using findIndex method.
      let objIndex = memberBudgetArray.findIndex(
          (obj) => obj.memberName == member.memberName
        ),
        // بر اساس ایندکس بالا مقدار بودجه شخص مورد نظر را بگیر
        storedBudget = memberBudgetArray[objIndex].newAmount,
        // آن را با مقدار جدید جمع بزن
        sumNewAmount = storedBudget + member.newAmount;
      storedBudget = sumNewAmount;
      // حال میخوایم آبجکتی بسازیم که جایگزین آبجکت قبلی شود
      //   یک آرایه از آبجکت جدید با مقدار جدید بساز
      let newArrForObj = [
          {
            memberName: getHousehold.value,
            newAmount: storedBudget,
          },
        ],
        // آرایه ای بساز که دو آبجکت قبلی را ادغام کند
        replacingObj = memberBudgetArray.map(
          (obj) =>
            newArrForObj.find((o) => o.memberName === obj.memberName) || obj
        );
      console.log(replacingObj);
      //  آرایه جایگزین را به لوکال استورج بفرست
      localStorage.setItem("memberBudget", JSON.stringify(replacingObj));
    }
  }
}

class Expense {
  constructor() {}
  addExpense(household, title, price, category) {
    let userData = {
      Household: household,
      Title: title,
      Price: price,
      Category: category,
    };
    exArray.push(userData);
    console.log(exArray);
    localStorage.setItem("exArray", JSON.stringify(exArray));
    console.log(exArray);
    new Expense().expenseAmount(price);
    new Expense().memberExpense(price)
  }
  expenseAmount(price) {
    totalExpense = Number(totalExpense) + price;
    localStorage.setItem("totalExpense", totalExpense);
    return totalExpense;
  }
  memberExpense(price){
    console.log(price);
    let user = ["ali"];
    memberExpenseArray.push(user);
    console.log(memberExpenseArray.push(user));
  }

  food() {
    if (
      typeof foodCost.value == "number" ||
      !foodCost.value ||
      getFoodHousehold.value == "" ||
      foodTitle.value == ""
    ) {
      let parent = document.querySelector("#food"),
        child = document.querySelector("#food label");
      new UserInterface().displayErrorMsg(
        `لطفا مقادیر را به درستی وارد کنید.`,
        parent,
        child
      );
    } else {
      const newExpense = Number(foodCost.value);
      const householdNewEx = getFoodHousehold.value;
      const householdNewExTitle = foodTitle.value;
      console.log(typeof householdNewExTitle);
      const category = foodCat.id;
      new Expense().addExpense(
        householdNewEx,
        householdNewExTitle,
        newExpense,
        category
      );
    }
  }
  enertainment() {
    if (
      typeof entertainmentCost.value == "number" ||
      !entertainmentCost.value ||
      getEntHousehold.value == "" ||
      entertainmentTitle.value == ""
    ) {
      let parent = document.querySelector("#entertainment"),
        child = document.querySelector("#entertainment label");
      new UserInterface().displayErrorMsg(
        `لطفا مقادیر را به درستی وارد کنید.`,
        parent,
        child
      );
    } else {
      const newExpense = Number(entertainmentCost.value);
      const householdNewEx = getEntHousehold.value;
      const householdNewExTitle = entertainmentTitle.value;
      const category = entCat.id;
      new Expense().addExpense(
        householdNewEx,
        householdNewExTitle,
        newExpense,
        category
      );
    }
  }
  transport() {
    if (
      typeof transportCost.value == "number" ||
      !transportCost.value ||
      getTransportHousehold.value == "" ||
      transportTitle.value == ""
    ) {
      let parent = document.querySelector("#transport"),
        child = document.querySelector("#transport label");
      new UserInterface().displayErrorMsg(
        `لطفا مقادیر را به درستی وارد کنید.`,
        parent,
        child
      );
    } else {
      const newExpense = Number(transportCost.value);
      const householdNewEx = getTransportHousehold.value;
      const householdNewExTitle = transportTitle.value;
      const category = transportCat.id;
      new Expense().addExpense(
        householdNewEx,
        householdNewExTitle,
        newExpense,
        category
      );
    }
  }
  room() {
    if (
      typeof roomCost.value == "number" ||
      !roomCost.value ||
      getRoomHousehold.value == "" ||
      roomTitle.value == ""
    ) {
      let parent = document.querySelector("#room"),
        child = document.querySelector("#room label");
      new UserInterface().displayErrorMsg(
        `لطفا مقادیر را به درستی وارد کنید.`,
        parent,
        child
      );
    } else {
      const newExpense = Number(roomCost.value);
      const householdNewEx = getRoomHousehold.value;
      const householdNewExTitle = roomTitle.value;
      const category = roomCat.id;
      new Expense().addExpense(
        householdNewEx,
        householdNewExTitle,
        newExpense,
        category
      );
    }
  }
  other() {
    if (
      typeof otherCost.value == "number" ||
      !otherCost.value ||
      getOtherHousehold.value == "" ||
      otherTitle.value == ""
    ) {
      let parent = document.querySelector("#food"),
        child = document.querySelector("#food label");
      new UserInterface().displayErrorMsg(
        `لطفا مقادیر را به درستی وارد کنید.`,
        parent,
        child
      );
    } else {
      const newExpense = Number(otherCost.value);
      const householdNewEx = getOtherHousehold.value;
      const householdNewExTitle = otherTitle.value;
      const category = otherCat.id;
      new Expense().addExpense(
        householdNewEx,
        householdNewExTitle,
        newExpense,
        category
      );
    }
  }
}
