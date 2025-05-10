var header = document.querySelector("h1")
var headerText = "Book Library"
var index = 0

function showNextCharacter(){
    if(index<headerText.length){
        header.textContent+=headerText[index]
        index++
        setTimeout(showNextCharacter,200)
    }
}

showNextCharacter()

var btnOK = document.querySelector("button")
var fisrtDiv = document.querySelector("div")
var numRegExp = /^[1-9][0-9]*$/
var bookNameRegExp = /^[A-Za-z0-9][A-Za-z0-9'.,!?&:;()"\s-]*$/
var bookPriceRegExp = /^\d*\.?\d*[1-9]\d*$/
var authorNameRegExp = /^[A-Za-z][A-Za-z' -]*$/
var authorEmailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
var noOfBooks = 0;
var errorNum = document.querySelector("p")
var inputFieldDiv = document.querySelectorAll("div")[1]
btnOK.addEventListener("click",function(){
    noOfBooks = document.querySelector("input")
    if(numRegExp.test(noOfBooks.value)){
        noOfBooks = Number(noOfBooks.value)
        fisrtDiv.classList.add("disable")
        errorNum.classList.add("disable")
        inputFieldDiv.classList.remove("disable")
    }
    else{
        errorNum.classList.remove("disable")
        errorNum.classList.add("error")
        errorNum.innerHTML = "Only Correct Positive Numbers Allowed"
        noOfBooks.value = ""
    }
})





var nameError = document.querySelectorAll(".disable p")[0]
var priceError = document.querySelectorAll(".disable p")[1]
var authorNameError = document.querySelectorAll(".disable p")[2]
var authorEmailError = document.querySelectorAll(".disable p")[3]

var book;
var price;
var auName;
var auEmail;
var btnSubmit = document.querySelector(".disable button")
var bookArray = []
var counter = 0 
btnSubmit.addEventListener("click",function(){
    
    if(bookNameRegExp.test(document.getElementById("bName").value)){
        book = document.getElementById("bName").value
        nameError.classList.add("disable")
    }
    else{
        nameError.classList.remove("disable")
        nameError.innerHTML = "Invalid book name"
    }
    if(bookPriceRegExp.test(document.getElementById("bPrice").value)){
        price = document.getElementById("bPrice").value
        priceError.classList.add("disable")
    }
    else{
        priceError.classList.remove("disable")
        priceError.innerHTML = "Invalid Price"
    }

    if(authorNameRegExp.test(document.getElementById("authorName").value)){
        auName = document.getElementById("authorName").value
        authorNameError.classList.add("disable")
    }
    else{
        authorNameError.classList.remove("disable")
        authorNameError.innerHTML = "Invalid Author Name"
    }
    if(authorEmailRegExp.test(document.getElementById("authorEmail").value)){
        auEmail = document.getElementById("authorEmail").value
        authorEmailError.classList.add("disable")
    }
    else{
        authorEmailError.classList.remove("disable")
        authorEmailError.innerHTML = "Invalid Author E-mail"
    }
    if(book&&price&&auName&&auEmail){
        bookArray[counter] = new Book(book,price,auName,auEmail)
        counter++
        document.getElementById("bName").value = ""
        document.getElementById("bPrice").value = ""
        document.getElementById("authorName").value = ""
        document.getElementById("authorEmail").value = ""
        var add = document.querySelector(".add")
        if(counter<noOfBooks){
            add.classList.remove("disable")
            add.innerHTML = "Book Added successfully"
            setTimeout(function(){
                add.classList.add("disable")
            },3000)
        }
    }
    if(counter==noOfBooks){
        inputFieldDiv.classList.add("disable") 
        var tableBody = document.querySelector("tbody")
        for(var i = 0;i<bookArray.length;i++){
            tableBody.innerHTML += "<tr><td>"+bookArray[i].bName+"</td>"+
            "<td>$"+bookArray[i].bPrice+"</td><td>"+bookArray[i].aName+"</td>"+
            "<td>"+bookArray[i].aEmail+"</td><td><button class='edit'>Edit</button></td>"+
            "<td><button class = 'delete'>Delete</button></td></tr>"
        }
        document.querySelector("table").classList.remove("disable")
        document.addEventListener("click",function(e){
            if(e.target.classList.contains("edit")){
                var trEdited = e.target.closest("tr");
                var index = Array.prototype.indexOf.call(tableBody.children,trEdited)

                trEdited.innerHTML = "<td><input type = 'text' class='bName' value = '"+bookArray[index].bName+"'></td>"+
                "<td><input type = 'text' class='bPrice' value = '"+bookArray[index].bPrice+"'></td>"+
                "<td><input type = 'text' class='authorName' value = '"+bookArray[index].aName+"'></td>"+
                "<td><input type = 'text' class='authorEmail' value = '"+bookArray[index].aEmail+"'></td>"+
                "<td><button class = 'save'>Save</button>"+
                "</td><td><button class = 'delete'>delete</button></td>"
            }
            if(e.target.classList.contains("save")){
                var trEdited = e.target.closest("tr");
                var index = Array.prototype.indexOf.call(tableBody.children,trEdited)
                if(bookNameRegExp.test(document.getElementsByClassName("bName")[0].value)){
                    book = document.getElementsByClassName("bName")[0].value
                }
                
                if(bookPriceRegExp.test(document.getElementsByClassName("bPrice")[0].value)){
                    price = document.getElementsByClassName("bPrice")[0].value
                    
                }
                
            
                if(authorNameRegExp.test(document.getElementsByClassName("authorName")[0].value)){
                    auName = document.getElementsByClassName("authorName")[0].value
                    
                }
                
                if(authorEmailRegExp.test(document.getElementsByClassName("authorEmail")[0].value)){
                    auEmail = document.getElementsByClassName("authorEmail")[0].value
                    
                }
                
                if(book&&price&&auName&&auEmail){
                    bookArray[index].bName = book
                    bookArray[index].bPrice = price
                    bookArray[index].aName = auName
                    bookArray[index].aEmail = auEmail
                    trEdited.innerHTML = "<tr><td>"+bookArray[index].bName+"</td>"+
                        "<td>$"+bookArray[index].bPrice+"</td><td>"+bookArray[index].aName+"</td>"+
                        "<td>"+bookArray[index].aEmail+"</td><td><button class='edit'>Edit</button></td>"+
                        "<td><button class = 'delete'>Delete</button></td></tr>"
                    
                }
            }

            if(e.target.classList.contains("delete")){
                var trDeleted = e.target.closest("tr")
                var index = Array.prototype.indexOf.call(tableBody.children, trDeleted)

                bookArray.splice(index,1)
                trDeleted.innerHTML = ""
                if(bookArray.length==0){
                    document.querySelector("table").classList.add("disable")
                    var tableParagraph = document.getElementsByClassName("table-para")[0]
                    tableParagraph.innerHTML = "You have deleted all books"
                }
            }
        })
    }
})

function Book(bookName, bookPrice,authorName,authorEmail){
    this.bName = bookName
    this.bPrice = bookPrice
    Author.call(this,authorName,authorEmail)
}

function Author(authorName,authorEmail){
    this.aName = authorName
    this.aEmail = authorEmail
}