const [
	foodsSelect,
	costomersList,
	ordersList,
	clientId,
	userHeader,
	userAdd,
	addUserUsername,
	addUserContact,
	foodsForm,
	foodsCount
] = getElement('#foodsSelect','.customers-list', '.orders-list', '#clientId', '#userHeader', '#userAdd', '#usernameInput', '#telephoneInput', '#foodsForm', '#foodsCount')


async function renderUsers () {
	let {users} = await request(USERS)
	costomersList.innerHTML = null
	for(let user of users){
		let [li, span, a] = createElement('li', 'span', 'a')
		
		li.classList.add('customer-item')
		span.classList.add('customer-name')
		a.classList.add('customer-phone')

		span.textContent = user.username
		a.textContent = '+' + user.contact
		a.setAttribute('href', 'tel:+' + user.contact)
		li.append(span)
		li.append(a)
		costomersList.append(li)


		li.onclick = () => {
			clientId.textContent = user.userId
			userHeader.textContent = user.username
			renderOrders(user.userId)

			foodsForm.onsubmit = async (event) => {
				event.preventDefault()
				let addOrderFoodId = foodsSelect.value
				let addOrderUserId = user.userId
				let addOrderCount = foodsCount.value
				await request(ADDORDER,{addOrderFoodId,addOrderUserId,addOrderCount})
				foodsCount.value = ''
				renderOrders(user.userId)
			}
		}


		userAdd.onsubmit = async (event) => {
			event.preventDefault()
			let addUserUsernames = addUserUsername.value
			let addUserContacts = addUserContact.value
			await request(ADDUSER, {addUserUsernames,addUserContacts})

			renderUsers()
			addUserUsername.value = ''
			addUserContact.value = ''
		}

	}
}

async function renderOrders (userId) {
	let {orders} = await request(ORDERS, {userId})
	 ordersList.innerHTML = null
	for(let order of orders) {
		const [li, img, div, foodName, foodCount] = createElement('li','img', 'div', 'span', 'span')
		li.classList.add('order-item')
		foodName.classList.add('order-name')
		foodCount.classList.add('order-count')

		img.setAttribute('src', order.food.foodImg)
		img.setAttribute('alt', order.food.foodName)

		foodName.textContent = order.food.foodName
		foodCount.textContent = order.count

		div.append(foodName)
		div.append(foodCount)

		li.append(img)
		li.append(div)
		ordersList.append(li)

	}
}



renderUsers()

async function renderFoods () {
	let {foods} = await request(FOODS)
	for(let food of foods){
		let [option] = createElement('option')
		option.value = food.foodId
		option.textContent = food.foodName
		foodsSelect.append(option)
	}
}

renderFoods()



