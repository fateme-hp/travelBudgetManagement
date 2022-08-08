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
    createMemberBtn = document.querySelector('#BtnCreateHousehold');
    

    
    // eventListeners
    // check if travel exist
    document.addEventListener('DOMContentLoaded' , function(){
    
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
          let  newTravelInfo = document.querySelectorAll('#createTravelForm input').values();
          console.log(newTravelInfo);
        }
    }
    // method creat member
    addMemberOfHousehold(){


    }
}
