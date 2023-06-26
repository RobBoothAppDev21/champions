import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-317cb-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsDB = ref(database, "endorsements")

const endorsementInput = document.getElementById("endorsement-input")
const toInput = document.getElementById("to-input")
const fromInput = document.getElementById("from-input")
const publishBtn = document.getElementById("publish-btn")
const endorseDiv = document.getElementById("endorsements-div")

publishBtn.addEventListener("click", function() {

  const endorsementObject = createEndorsementObject()

  push(endorsementsDB, endorsementObject)
//   addEndorsement(endorsementObject)
  
  clearInputFields()
})

onValue(endorsementsDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsObjectArray = Object.values(snapshot.val())
        
        endorseDiv.innerText = ""
        
        for (let i = 0; i < endorsementsObjectArray.length; i++) {
            let currentEndorsementObject = endorsementsObjectArray[i]
            let currentEndorsementMessage = currentEndorsementObject.message
            let currentEndorsementRecipient = currentEndorsementObject.recipient
            let currentEndorsementSender = currentEndorsementObject.sender
            
            addEndorsement(currentEndorsementObject)
        }
    } else {
        endorseDiv.innerText = "No endorsements"
    }
})

function createEndorsementObject() {
  const endorsementObj = {
    message: endorsementInput.value,
    recipient: toInput.value,
    sender: fromInput.value
  }

  return endorsementObj
}


function createEndorsementPost(endorsement) {
  const toUser = endorsement.sender
  const fromUser = endorsement.recipient
  const msg = endorsement.message

  let post = `To ${toUser}`
}

function clearInputFields() {
  toInput.value = ""
  fromInput.value = ""
  endorsementInput.value = ""
}

function addEndorsement(endorsement) {
  const recipientMessageSender = document.createDocumentFragment()
  const endorsementBottomFrag = document.createDocumentFragment()

  const eachEndorsement = document.createElement("div")
  eachEndorsement.classList.add("endorsement")

  
  recipientMessageSender.appendChild(
    Object.assign(
      document.createElement("p"),
      {
        classList: "recipient",
        textContent: `To ${endorsement.recipient}`
      }
    )
  )

  recipientMessageSender.appendChild(
    Object.assign(
      document.createElement("p"),
      {
        classList: "message",
        textContent: `${endorsement.message}`
      }
    )
  )

  recipientMessageSender.appendChild(
    Object.assign(
      document.createElement("p"),
      {
        classList: "sender",
        textContent: `From ${endorsement.sender}`
      }
    )
  )

  endorseDiv.appendChild(eachEndorsement)
  eachEndorsement.appendChild(recipientMessageSender)
}