//selectors

let destination = document.querySelector('#destination'),
    passenger = document.querySelector('#passenger'),
    startDate = document.querySelector('#startDate'),
    endDate = document.querySelector('#endDate'),
    createTravelBtn = document.querySelector('#createTravelBtn'),
    createTravelForm = document.querySelector('#createTravelForm'),
    desc = document.querySelector('#desc'),
    memberName = document.querySelector('#memberName'),
    memberWallet = document.querySelector('#memberWallet'),
    travelData= document.querySelector('#travelData'),
    travelManagement = document.querySelector('#travelManagement'),
    createMemberBtn = document.querySelector('#BtnCreateHousehold'),
    totalBudgetAmount = document.querySelector('#totalBudgetAmount'),
    addToBudgetForm = document.querySelector('#addToBudgetForm'),
    addToBudgetBtn = document.querySelector('#addToBudgetBtn'),
    addToBudget = document.querySelector('#addToBudget'),
    newWalletAmount = document.querySelector('#newWallet'),
    householdBudgetForm = document.querySelector('#householdBudgetForm'),
    delBtn= document.querySelector('#delBtn'),
    descInfo = localStorage.getItem('description'),
    travelArray = JSON.parse(localStorage.getItem("travel") || "[]"),
    totalBudget = localStorage.getItem("totalBudget") || 0 ;
   
    

    
    // eventListeners
    // check if travel exist
    document.addEventListener('DOMContentLoaded' , function(){
        if (travelArray.length ===0){
            createTravel.style.display="flex"
        }
        else{
            for (let i = 0; i < travelArray.length; i++) {
                const infoSpan = document.querySelectorAll('.infoSpan');
                    infoSpan[i].append(` ${travelArray[i]} `)
              }
               descInfo = localStorage.getItem('description');
              document.querySelector('#travelInfo p').append(` ${descInfo} `);
              totalBudgetAmount.append(` ${totalBudget} `);

            new UserInterface().showManagement();
        }
    })
    // createTravel 
    createTravelBtn.addEventListener('click', function(e){
        e.preventDefault()
        const newTravel = new Travel().createTravel();

    })

    // creat Member Household
    createMemberBtn.addEventListener('click' , function(e){
        e.preventDefault();

        // read value from form
        let fullName = memberName.value,
        wallet = memberWallet.value;

        // check the value of fields are correct
        if(fullName ==="" || wallet ===""){
            new UserInterface().displayErrorMsg(` لطفا همه ی فیلد ها را پر کنید.`)

        }else {
            const member = new Travel(fullName,wallet);
            const Household =  Travel(fullName,wallet).addMemberOfHousehold();
            console.log(Household);
        }

    })

    addToBudget.addEventListener('click', function(){
        new Budget().addToBudget();
    })
    addToBudgetBtn.addEventListener('click', function(){
       
        new Budget().addToWallet();
    })
    delBtn.addEventListener('click' , function (){
        localStorage.clear();
        createTravel.style.display ="flex";
        travelManagement.style.display ="none";
    })
    

    class UserInterface{
        constructor(){};
    
           // display MessageBox
           displayErrorMsg(msg, parent, child) {
            // create message box
            const MessageBox = document.createElement('div');
            MessageBox.innerText = msg;
            MessageBox.classList = 'error';
            // show message
            parent.insertBefore(MessageBox ,child);
    
            // remove message box
            setTimeout(function () {
                MessageBox.remove()
            }, 6000)
        };
        showManagement(){
            createTravel.style.display ="none";
            travelManagement.style.display="flex"
        };
    };
class Travel{
    
    constructor(fullName,wallet){
        this.fullName = fullName;
        this.wallet = wallet;
    };

    // methods
    // method create travel
    createTravel(){
       
        if(!desc.value || !destination.value || !passenger.value || !startDate.value || !endDate.value) {
            const parent01 = document.querySelector('#createTravelForm'),
                child01 = document.querySelector('#createTravelForm label');
                new UserInterface().displayErrorMsg(` لطفا همه ی فیلد ها را پر کنید. `, parent01, child01);
        } else{
           
          let  newTravelInfo = document.querySelectorAll('#createTravelForm input');

          for (let i = 0; i < newTravelInfo.length; i++) {
            const infoSpan = document.querySelectorAll('.infoSpan');
                infoSpan[i].append(newTravelInfo[i].value)
                travelArray.push(newTravelInfo[i].value);
                console.log(travelArray);
                localStorage.setItem('travel', JSON.stringify(travelArray))
          }
          let newTravelDesc= document.querySelector('#createTravelForm textarea');
          document.querySelector('#travelInfo p').append(newTravelDesc.value);
          localStorage.setItem('description', newTravelDesc.value) 
          createTravelForm.reset();
          new UserInterface().showManagement();
        }
    };

    
    // method creat member
    addMemberOfHousehold(){
        localStorage.setItem()

    }
};




class Budget{
    constructor(){}

     // methods
 
    // add to budget btn
    addToBudget(){
        addToBudgetForm.style.display="block";
        addToBudget.disabled = true;
    };
    // adding to wallet
    addToWallet(){
        
       if( typeof newWalletAmount.value =="number"|| !newWalletAmount.value){
             const budgetFormChild = document.querySelector('#addToBudgetForm label')
             new UserInterface().displayErrorMsg(`لطفا مقادیر را به درستی وارد کنید.`, addToBudgetForm, budgetFormChild);               
       } else{
        const newAmount = Number(newWalletAmount.value);
        new Budget().budgetAmount(newAmount);
        newWalletAmount.value="";
        addToBudget.disabled = false;
        addToBudgetForm.style.display="none";
        location.reload();
       }
    };
       // total budget
       budgetAmount(budget) {
        totalBudget = Number(totalBudget) + budget;
        localStorage.setItem('totalBudget', totalBudget);
        return totalBudget
    };
   
}
