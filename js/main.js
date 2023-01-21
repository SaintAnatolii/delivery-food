document.addEventListener('DOMContentLoaded', () => {

    'use strict';
    // day 1
    const userName = document.querySelector('.user-name');
    const buttonAuth = document.querySelector('.button-auth');
    const buttonCart = document.querySelector('.button-cart');
    const buttonOut = document.querySelector('.button-out');
    const modalAuth = document.querySelector('.modal-auth');
    const closeAuth = document.querySelector('.close-auth');
    const logInForm = document.querySelector('#logInForm');
    const loginInpit = document.querySelector('#login');
    const passwordInpit = document.querySelector('#password');
    let login = localStorage.getItem('isLogged');
    let password = null;
    const restaurants = document.querySelector('.restaurants');
    const cardsRestaurants = document.querySelector('.cards-restaurants');
    const containerPromo = document.querySelector('.container-promo');
    const sectionHeading = document.querySelector('.section-heading');
    const menu = document.querySelector('.menu');
    const logo = document.querySelector('.logo');
    const cardsMenu = document.querySelector('.cards-menu');
    const restaurantTitle = document.querySelector('.restaurant-title');
    const restaurantRating = document.querySelector('.rating');
    const restaurantPrice = document.querySelector('.price');
    const restaurantCategory = document.querySelector('.category');
    const inputSearch = document.querySelector('.input-search');
    const modal = document.querySelector('.modal');
    const cartButton = document.querySelector('#cart-button');
    const close = document.querySelector('.close');

    const modalBody = document.querySelector('.modal-body');
    const foodRow = document.querySelector('.food-row');
    const modalPriceTag = document.querySelector('.modal-pricetag');
    const clearCartButton = document.querySelector('.clear-cart');
    const cart = [];

    const addToCart = (e) => {
        const target = e.target;

        const buttonAddToCart = target.closest('.button-add-cart');
        console.log(buttonAddToCart);

        if (buttonAddToCart) {
            const card = target.closest('.card');
            const title = card.querySelector('.card-title-reg').textContent;
            const cost = card.querySelector('.card-price').textContent;
            const id = buttonAddToCart.id;

            const food = cart.find((item)=> {
                return item.id === id;
            });

            if (food) {
                food.count += 1;
            } else {
                //? добавить информацию в массив "Корзина"
                cart.push({id,title,cost,count: 1});
                console.log(cart);
            };
        };
    };


    const renderCart = () => {
        modalBody.textContent = '';

        cart.forEach((good)=>{
            const itemCart = `
                <div class="food-row">
                    <span class="food-name">${good.title}</span>
                    <strong class="food-price">${good.cost}</strong>
                    <div class="food-counter">
                        <button class="counter-button counter-minus" data-id="${good.id}">-</button>
                            <span class="counter">${good.count}</span>
                        <button class="counter-button counter-plus" data-id="${good.id}">+</button>
                    </div>
                </div>
            `;

            modalBody.insertAdjacentHTML('beforeend', itemCart);
        });

        let totalPrice = 0;

        cart.forEach((good)=>{
            totalPrice += (parseFloat(good.cost)*good.count);
        });

        console.log(totalPrice);
        modalPriceTag.textContent = totalPrice + ' ₽';
    };

    const changeCount = (e) => {
        const target = e.target;

        // if (target.classList.contains('counter-minus')) {
        //     const food = cart.find((good)=> {
        //         return good.id === target.dataset.id;
        //     });

        //     food.count--;
        //     renderCart();
        // };

        // if (target.classList.contains('counter-plus')) {
        //     const food = cart.find((good)=> {
        //         return good.id === target.dataset.id;
        //     });

        //     food.count++;
        //     renderCart();
        // };

        if (target.classList.contains('counter-button')) {
            const food = cart.find((good)=> {
                return good.id === target.dataset.id;
            });
            if (target.classList.contains('counter-minus')) {
                food.count--;
                if (food.count === 0) {
                    cart.splice(cart.indexOf(food), 1);
                };
            };
            if (target.classList.contains('counter-plus')) food.count++;

            renderCart();
        }



    }

    const clearCart = () =>  {
        cart.length = 0;
        renderCart();
    };


    const toggleModal = () => {
        modal.classList.toggle('is-open');
    };

    const toggleModalAuth = () => {
        modalAuth.classList.toggle('is-open');
    };

    // Авторизация
    const autorized = () => {
        console.log('Авторизован');

        const logOut = () => {
            login = null;
            localStorage.removeItem('isLogged');

            userName.style.display = 'none';
            buttonOut.style.display = 'none';
            buttonAuth.style.display = '';
            cartButton.style.display = '';

            buttonOut.removeEventListener('click', logOut);
            checkAuth();
        }

        userName.textContent = login;
        userName.style.display = 'inline';
        buttonOut.style.display = 'flex';
        buttonAuth.style.display = 'none';
        cartButton.style.display = 'flex';

        buttonOut.addEventListener('click', logOut);
        
    };

    const notAutorized = () => {
        console.log('Не авторизован')

        const logIn = (e) => {
            e.preventDefault();
            if (loginInpit.value.trim() && passwordInpit.value.trim()) {
                login = loginInpit.value;
                password = passwordInpit.value;
                localStorage.setItem('isLogged', login); 


                logInForm.removeEventListener('submit', logIn);
                buttonAuth.removeEventListener('click', toggleModalAuth);
                modalAuth.removeEventListener('click', (e)=> {
                    if (e.target === modalAuth || e.target === closeAuth) {
                        toggleModalAuth();
                    }
                });


                toggleModalAuth();
                logInForm.reset();
                checkAuth();
            } else {
                alert('Заполните все поля!')
                loginInpit.value = '';
                passwordInpit.value = '';
            };
        };

        logInForm.addEventListener('submit', logIn);
        buttonAuth.addEventListener('click', toggleModalAuth);
        modalAuth.addEventListener('click', (e)=> {
            if (e.target === modalAuth || e.target === closeAuth) {
                toggleModalAuth();
            }
        });
    };

    const checkAuth = () => {
        if (login) {
            autorized();
        } else {
            notAutorized();
        }
    }

    const createCardRestaurant = (rest) => {

        const {
            name,
            time_of_delivery: timeOfDel ,
            stars,
            price,
            kitchen,
            image,
            products
        } = rest;


        const cardRestaurant = document.createElement('a');
        cardRestaurant.className = 'card card-restaurant';
        cardRestaurant.setAttribute('data-goods', rest.products);
        cardRestaurant.restaurantInfo = {name, stars, price, kitchen};

        const card = `
            <img src="${rest.image}" alt="image" class="card-image"/>
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${rest.name}</h3>
                    <span class="card-tag tag">${rest.time_of_delivery} мин</span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        ${rest.stars}
                    </div>
                    <div class="price">От ${rest.price} ₽</div>
                    <div class="category">${rest.kitchen}</div>
                </div>
            </div>

        `;
        cardRestaurant.insertAdjacentHTML('beforeend', card);
        cardsRestaurants.insertAdjacentElement('beforeend', cardRestaurant);

    };

    const createCardGood = (good) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', good.id);
        card.innerHTML = `
            <img src="${good.image}" alt="image" class="card-image"/>
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${good.name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">${good.description}</div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart" id="${good.id}">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price card-price-bold">${good.price} ₽</strong>
                </div>
            </div>
        `;

        cardsMenu.insertAdjacentElement('beforeend', card);
    };

    const openGoods = (e) => {
        const target = e.target;
        const restaurant = target.closest('.card-restaurant');

        if (restaurant) {
            const goods2 = restaurant.dataset.goods;

            console.dir(restaurant)

            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            restaurantTitle.textContent = restaurant.restaurantInfo.name;
            restaurantRating.textContent = restaurant.restaurantInfo.stars;
            restaurantPrice.textContent = `От ${restaurant.restaurantInfo.price} ₽`
            restaurantCategory.textContent = restaurant.restaurantInfo.kitchen;

            getData(`./db/${goods2}`)
                .then((goods) => {
                    goods.forEach((good) => {
                        createCardGood(good);
                    })
                })
        };
    };

    const closeGoods = () => {
        inputSearch.value = '';
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
    };


    const getData = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}, статус: ${response.status}`)
        } else {
            return await response.json();
        }
    };

    getData(`./db/partners.json`).then((restaurantsList)=> {
        restaurantsList.forEach((restaurant)=> {
            createCardRestaurant(restaurant);
        })
    });

    inputSearch.addEventListener('keypress', (e)=> {
        const value = e.target.value.trim();
        if (e.key === 'Enter') {

            if (!value) {
                inputSearch.textContent = '';
                return;
            } else {
                getData('./db/partners.json')      
                .then((restaurantsItems) => {
                    const links = restaurantsItems.map((restaurantItem) => {
                        return restaurantItem.products;
                    })  
                    console.log(links);
                    return links;
                })
                .then((links) => {
                    console.log(links);
                    cardsMenu.textContent = '';
                    links.forEach((link) => {
                        getData(`./db/${link}`)
                        .then((data) => {
                            const resultSearch = data.filter((food) => {
                                const name = food.name.toLowerCase();
                                return name.includes(value.toLowerCase());
                            })
                            containerPromo.classList.add('hide');
                            restaurants.classList.add('hide');
                            menu.classList.remove('hide');
                            restaurantTitle.textContent = 'Результат поиска';
                            restaurantRating.textContent = '';
                            restaurantPrice.textContent = '';
                            restaurantCategory.textContent = '';

                            resultSearch.forEach(createCardGood);
                        })
                    })
                })
            }
        };

        
    });
    cardsRestaurants.addEventListener('click', openGoods);
    logo.addEventListener('click', closeGoods);

    cartButton.addEventListener('click', ()=> {
        renderCart();
        toggleModal();
    });
    modal.addEventListener('click', (e)=> {
        if (e.target === modal || e.target === close) {
            toggleModal();
        }
    });
    
    cardsMenu.addEventListener('click', addToCart);
    modalBody.addEventListener('click', changeCount);
    clearCartButton.addEventListener('click', clearCart);

    checkAuth();


}); 