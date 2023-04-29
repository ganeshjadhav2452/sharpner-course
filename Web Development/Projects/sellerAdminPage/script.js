
let submitBtn = document.querySelector('.submitBtn');

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    let price = document.querySelector('.input1').value
    let productName = document.querySelector('.input2').value
    let category = document.querySelector('.input3').value

    let obj = {
        price,
        productName,
        category
    }

    try {

        if (obj.category == 'Electronic') {
            let postResponse = await axios.post('https://crudcrud.com/api/5ac92465f0be440ba2b0919d7c4b6197/electronic', obj);

            showProducts(postResponse.data)

        }
        else if (obj.category == 'Skin Care') {

            let postResponse = await axios.post('https://crudcrud.com/api/5ac92465f0be440ba2b0919d7c4b6197/skincare', obj);
            showProducts(postResponse.data)

        } else {

            let postResponse = await axios.post('https://crudcrud.com/api/5ac92465f0be440ba2b0919d7c4b6197/food', obj);
            showProducts(postResponse.data)
        }

    } catch (err) {
        console.log(err)
    }

})

let showProducts = async (response) => {
    console.log(response.category)
    if (response.category == 'Electronic') {
        let card = `<div class="col-3 product">
        <div class="card  text-center  mb-1" style="width: 15rem;height: 12rem;">
            <div class="card-body p-2 border border-1 border-dark rounded-4">
                <h5 class="card-title fs-3">${response.productName}</h5>
                
                    
                <p class="font-weight-bold fs-3">Rs. <span>${response.price}</span></p>
                <button class="btn delete btn-warning border border-2 border-dark">Remove Product</button>
            </div>
        </div>
    </div>`

        let elCatagory = document.querySelector('.elCatagory')
        let div = document.createElement('div')
        div.innerHTML = card;
        elCatagory.appendChild(div)
    }
    else if (response.category == 'Skin Care') {
        let card = `<div class="col-3 product">
        <div class="card  text-center  mb-1" style="width: 15rem;height: 12rem;">
            <div class="card-body p-2 border border-1 border-dark rounded-4">
                <h5 class="card-title fs-3">${response.productName}</h5>
                
                    
                <p class="font-weight-bold fs-3">Rs. <span>${response.price}</span></p>
                <button class="btn delete btn-warning border border-2 border-dark">Remove Product</button>
            </div>
        </div>
    </div>`

        let skinCatagory = document.querySelector('.skinCatagory')
        let div = document.createElement('div')
        div.innerHTML = card;
        skinCatagory.appendChild(div)
    }
    else if (response.category == 'Food') {
        let card = `<div class="col-3 product">
        <div class="card  text-center  mb-1" style="width: 15rem;height: 12rem;">
            <div class="card-body p-2 border border-1 border-dark rounded-4">
                <h5 class="card-title fs-3">${response.productName}</h5>
                
                    
                <p class="font-weight-bold fs-3">Rs. <span>${response.price}</span></p>
                <button class="btn delete btn-warning border border-2 border-dark">Remove Product</button>
            </div>
        </div>
    </div>`

        let foodCatagory = document.querySelector('.foodCatagory')
        let div = document.createElement('div')
        div.innerHTML = card;
        foodCatagory.appendChild(div)
    } else {
        console.log('something went wrong with category')
    }




    // implementing delete functionality
    let parentOfCard;


    let deleteBtns = document.querySelectorAll('.delete')
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', async (e) => {

            // for delete button of Electronic category
            if (e.target.classList.contains('delete')) {
                if (response.category == 'Electronic') {
                    parentOfCard = e.target.closest('.product');
                    console.log(parentOfCard)

                    if (parentOfCard) {
                        try {
                            // deleting item from the DOM
                            let card = parentOfCard.firstElementChild;
                            if (parentOfCard.contains(card)) {
                                parentOfCard.removeChild(card)
                            }
                            // requesting backend to delete card data from the backend
                            console.log(response._id)
                            await axios.delete(`https://crudcrud.com/api/5ac92465f0be440ba2b0919d7c4b6197/electronic/${response._id}`)



                        } catch (err) {
                            console.log(err)
                        }
                    }

                }

            }

            //for delete button skin care

            // for delete button of Electronic category
            if (e.target.classList.contains('delete')) {
                if (response.category == 'Skin Care') {
                    parentOfCard = e.target.closest('.product');
                    console.log(parentOfCard)

                    if (parentOfCard) {
                        try {

                            // deleting item from the DOM
                            let card = parentOfCard.firstElementChild;
                            if (parentOfCard.contains(card)) {
                                parentOfCard.removeChild(card)
                            }
                            // requesting backend to delete card data from the backend

                            await axios.delete(`https://crudcrud.com/api/5ac92465f0be440ba2b0919d7c4b6197/skincare/${response._id}`)



                        } catch (err) {
                            console.log(err)
                        }
                    }

                }

            }

            //for delete button of food

            // for delete button of Electronic category
            if (e.target.classList.contains('delete')) {
                if (response.category == 'Food') {
                    parentOfCard = e.target.closest('.product');
                    console.log(parentOfCard)
                    if (parentOfCard) {
                        try {
                            // deleting item from the DOM
                            let card = parentOfCard.firstElementChild;
                            if (parentOfCard.contains(card)) {
                                parentOfCard.removeChild(card)
                            }
                            // requesting backend to delete card data from the backend

                            await axios.delete(`https://crudcrud.com/api/5ac92465f0be440ba2b0919d7c4b6197/food/${response._id}`)



                        } catch (err) {
                            console.log(err)
                        }
                    }

                }

            }
        })

    })

}

window.addEventListener('DOMContentLoaded', async (e) => {
    // getting electronic products
    let elResponse = await axios.get('https://crudcrud.com/api/5ac92465f0be440ba2b0919d7c4b6197/electronic')
    // console.log(elResponse)

    elResponse.data.forEach((item) => {
        console.log(item)
        showProducts(item)
    })

    // getting skin care product

    let skinResponse = await axios.get('https://crudcrud.com/api/5ac92465f0be440ba2b0919d7c4b6197/skincare')
    skinResponse.data.forEach((item) => showProducts(item))

    // getting food product

    let foodResponse = await axios.get('https://crudcrud.com/api/5ac92465f0be440ba2b0919d7c4b6197/food')
    foodResponse.data.forEach((item) => showProducts(item))
})

