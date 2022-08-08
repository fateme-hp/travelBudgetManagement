//selectors

let destination = document.querySelector('#destination'),
    passenger = document.querySelector('#passenger'),
    startDate = document.querySelector('#startDate'),
    endDate = document.querySelector('#endDate'),
    createTravelBtn = document.querySelector('#createTravelBtn'),
    createTravelForm = document.querySelector('#createTravelForm'),
    description = document.querySelector('#description');

    
    // eventListeners
    // check if travel exist
    document.addEventListener('DOMContentLoaded' , function(){
    
    })
    // createTravel 
    createTravelBtn.addEventListener('click', function(){
    
        const newTravel = new Travel().createTravel()

    })
    class UserInterface{
        constructor(){}
    
           // display MessageBox
           displayMsg(msg) {
            // create message box
            const MessageBox = document.createElement('div')
            MessageBox.innerText = msg;
    
            // show message
            createTravelForm.appendChild(MessageBox)
    
            // remove message box
            setTimeout(function () {
                MessageBox.remove()
            }, 6000)
        }
    }
class Travel{
    
    constructor(){}

    // methods
    createTravel(){
       
        if(!description.value || !destination.value || !passenger.value || !startDate.value || !endDate.value) {
           new UserInterface().displayMsg(` لطفا همه ی فیلد ها را پر کنید.`)
        
        }
    }
}
