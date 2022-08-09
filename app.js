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
    descInfo = localStorage.getItem('description'),
    travelArray = JSON.parse(localStorage.getItem("travel") || "[]");
   
    

    
    // eventListeners
    // check if travel exist
    document.addEventListener('DOMContentLoaded' , function(){
        if (travelArray.length ===0){
            createTravel.style.display="flex"
        }
        else{
            for (let i = 0; i < travelArray.length; i++) {
                const infoSpan = document.querySelectorAll('.infoSpan');
                    infoSpan[i].append(travelArray[i])
              }
               descInfo = localStorage.getItem('description');
              document.querySelector('#travelInfo p').append(descInfo);

            new UserInterface().showManagement();
        }
    })
    // createTravel 
    createTravelBtn.addEventListener('click', function(e){
        e.preventDefault()
        const newTravel = new Travel().createTravel()

    })

    // creat Member Household
    createMemberBtn.addEventListener('click' , function(e){
        e.preventDefault();

        // read value from form
        let fullName = memberName.value,
        wallet = memberWallet.value;

        // check the value of fields are correct
        if(fullName ==="" || wallet ===""){
            UserInterface.displayMsg('لطفا مقادیر را به درستی وارد کنید.');

        }else {
            const member = new Travel(fullName,wallet);
            
        }

    })

    class UserInterface{
        constructor(){}
    
           // display MessageBox
           displayMsg(msg) {
            // create message box
            const MessageBox = document.createElement('p');
            MessageBox.innerText = msg;
            document.querySelector('#createTravelForm .error').getElementsByClassName.display ="block"
            // show message
            document.querySelector('#createTravelForm .error').appendChild(MessageBox)
    
            // remove message box
            setTimeout(function () {
                MessageBox.remove()
            }, 6000)
        }
        showManagement(){
            createTravel.style.display ="none";
            travelManagement.style.display="flex"
        }
    }
class Travel{
    
    constructor(fullName,wallet){
        this.fullName = fullName;
        this.wallet = wallet;
    }

    // methods
    // method create travel
    createTravel(){
       
        if(!desc.value || !destination.value || !passenger.value || !startDate.value || !endDate.value) {
           new UserInterface().displayMsg(` لطفا همه ی فیلد ها را پر کنید.`)
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
    }
    
    // method creat member
    addMemberOfHousehold(){


    }
}
