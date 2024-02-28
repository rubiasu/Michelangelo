import { createSignal, createEffect, createMemo } from './reactive.js';
// Strict Mode
"use strict";


// Calendar Data
const [selectedDate, setSelectedDate] = createSignal(null); // Store selected date

// Ticket Data
const [ticketOptions, setTicketOptions] = createSignal([
        { name: "adult", price: 29.95, qty: 0 },
        { name: "child", price: 19.95, qty: 0 },
        { name: "senior", price: 24.95, qty: 0 },
        { name: "student", price: 24.95, qty: 0 },
        { name: "military", price: 24.95, qty: 0 },
        { name: "VIP Adult", price: 49.95, qty: 0 },
        { name: "VIP Child", price: 39.95, qty: 0 },
        { name: "family Bundle", price: 19.95, qty: 0 },
        { name: "group Bundle", price: 27.45, qty: 0 }
]);

console.log(ticketOptions);

// Derived State (for Totals)
const totalTicketPrice = createMemo(() => {
    return ticketOptions().reduce((total, ticket) => total + (ticket.price * ticket.qty), 0);
});

const totalTicketQty = createMemo(() => {
    return  ticketOptions().reduce((total, ticket) => total + ticket.qty, 0);
});

// Checkout

// Cart

// Gift Shop

// Calendar
createEffect(() => { // Calendar UI Generation
    const monthsContainer = document.querySelector('.calendar .months');
    const prevButton = document.querySelector('.calendar .prev');
    const nextButton = document.querySelector('.calendar .next');

    const availableMonths =[
        { name: 'Mar 2024', value: "2024-03"},
        { name: 'Apr 2024', value: "2024-04"},
        { name: 'May 2024', value: "2024-05"},
        { name: 'Jun 2024', value: "2024-06"},
        { name: 'Jul 2024', value: "2024-07"},
        { name: 'Aug 2024', value: "2024-08"},
        { name: 'Sep 2024', value: "2024-09"},
        { name: 'Oct 2024', value: "2024-10"},
        { name: 'Nov 2024', value: "2024-11"},
        { name: 'Dec 2024', value: "2024-12"},
    ];

    let currentMonthIndex = 0;

    function updateMonthButtons() {
        monthsContainer.innerHTML = ''; // Clear existing buttons

        const prev = document.createElement('button');
        prev.classList.add('arrow prev');
        prev.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10.4142 12L15.7071 6.70711C16.0976 6.31658 16.0976 5.68342 15.7071 5.29289C15.3166 4.90237 14.6834 4.90237 14.2929 5.29289L8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L14.2929 18.7071C14.6834 19.0976 15.3166 19.0976 15.7071 18.7071C16.0976 18.3166 16.0976 17.6834 15.7071 17.2929L10.4142 12Z"/>
        </svg>`

        const next = document.createElement('button');
        next.classList.add('arrow next');
        next.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9.70711 5.29289C9.31658 4.90237 8.68342 4.90237 8.29289 5.29289C7.90237 5.68342 7.90237 6.31658 8.29289 6.70711L13.5858 12L8.29289 17.2929C7.90237 17.6834 7.90237 18.3166 8.29289 18.7071C8.68342 19.0976 9.31658 19.0976 9.70711 18.7071L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L9.70711 5.29289Z"/>
        </svg>`

        const firstMonth = document.createElement('button');
        firstMonth.classList.add('month');

        const secondMonth = document.createElement('button');
        secondMonth.classList.add('month');


        // Create and append buttons for the current month pair
        for (let i = 0; i < 2; i++) { 
            const monthIndex = currentMonthIndex + i;

            // Handle wrapping around if we go past the end of availableMonths 
            const actualIndex = monthIndex % availableMonths.length; 
            const month = availableMonths[actualIndex]; 


            /*
            <div class="months">
                <button class="arrow prev limit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10.4142 12L15.7071 6.70711C16.0976 6.31658 16.0976 5.68342 15.7071 5.29289C15.3166 4.90237 14.6834 4.90237 14.2929 5.29289L8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L14.2929 18.7071C14.6834 19.0976 15.3166 19.0976 15.7071 18.7071C16.0976 18.3166 16.0976 17.6834 15.7071 17.2929L10.4142 12Z"/>
                        </svg>
                </button>
                <button class="month current">Mar 2024</button>
                <button class="month">Apr 2024</button>
                <button class="arrow next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9.70711 5.29289C9.31658 4.90237 8.68342 4.90237 8.29289 5.29289C7.90237 5.68342 7.90237 6.31658 8.29289 6.70711L13.5858 12L8.29289 17.2929C7.90237 17.6834 7.90237 18.3166 8.29289 18.7071C8.68342 19.0976 9.31658 19.0976 9.70711 18.7071L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L9.70711 5.29289Z"/>
                        </svg>
                </button>
            </div>
            */
        
        }
    }

    prevButton.addEventListener('click', () => {
        currentMonthIndex--;
        if (currentMonthIndex < 0) {
            currentMonthIndex = availableMonths.length - 1; // Wrap to the end
        }
        updateMonthButtons();
        updateCalendarGrid(); // Update the calendar days
    });

    nextButton.addEventListener('click', () => {
        currentMonthIndex = (currentMonthIndex + 1) % availableMonths.length;
        updateMonthButtons();
        updateCalendarGrid(); // Update the calendar days
    });

    // Initial rendering
    updateMonthButtons();
    // updateCalendarGrid();



    const calendarContainer = document.querySelector('.calendar');

    function generateCalendar(month, year) { 
        // Logic to build the HTML for the calendar grid
        // ...

        calendarContainer.innerHTML = generatedCalendarHTML;
    }

    function updateCalendar() {
        // ... generate the calendar based on current month/year
    }

    const dateElements = calendarContainer.querySelectorAll('.week li');
    dateElements.forEach(dateEl => {
        dateEl.addEventListener('click', () => {
            const dateStr = dateEl.dataset.date;
            if (availableDates().includes(dateStr)) { 
                setSelectedDate(dateStr);
            } 
        });
    });

    // ... logic to handle month navigation

    updateCalendar(); // Initial calendar display
});

// Tickets
createEffect(() => { // Tickets UI Generation
    const ticketsContainer = document.querySelector('#tickets .tickets');
    ticketsContainer.innerHTML = ''; 
    ticketsContainer.appendChild(document.createElement('hr'));
  
    ticketOptions().forEach((ticket) => {
        createTicketDiv(ticket, ticketsContainer);
    });

    updateTotals();

    updateButton();

    function updateTotals() {
        const totalDiv = document.querySelector('.total');
        totalDiv.querySelector('.qty').textContent = totalTicketQty();
        totalDiv.querySelector('.price').textContent = `$${totalTicketPrice().toFixed(2)}`;
    }

    function updateButton() {
        const button = document.querySelector('#tickets .ticket-total .btn');
        let noTicket = (totalTicketQty() === 0); 
        let noDate = true;
        let noTime = true;
        button.disabled = (noTicket || noDate || noTime)
    }
  
  });

  
function createTicketDiv(ticket, container) { //Ticket Div UI
        const ticketDiv = document.createElement('div');
        ticketDiv.classList.add('ticket');

        const infoDiv = document.createElement('div');
        // HTML tabbed for readability
        infoDiv.innerHTML = `
            <div>
                <span class="info">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M12.2582 8.52434C11.7927 8.44449 11.314 8.53197 10.9068 8.77129C10.4996 9.0106 10.1902 9.38631 10.0335 9.83187C9.85018 10.3529 9.27926 10.6266 8.75827 10.4434C8.23728 10.2601 7.96351 9.68917 8.14678 9.16818C8.46025 8.27707 9.07898 7.52565 9.89339 7.04702C10.7078 6.56839 11.6653 6.39343 12.5963 6.55313C13.5274 6.71283 14.3719 7.19688 14.9802 7.91955C15.5884 8.64207 15.9214 9.5565 15.9201 10.5009C15.9197 12.0313 14.7851 13.0419 13.9748 13.5821C13.5392 13.8725 13.1107 14.086 12.795 14.2263C12.6358 14.2971 12.5016 14.3508 12.405 14.3876C12.3566 14.4061 12.3174 14.4204 12.2888 14.4305L12.2541 14.4427L12.243 14.4465L12.2391 14.4478L12.2376 14.4483C12.2376 14.4483 12.2363 14.4487 11.9201 13.5L12.2363 14.4487C11.7124 14.6234 11.1461 14.3402 10.9714 13.8162C10.7969 13.2927 11.0796 12.7267 11.6028 12.5517L11.6188 12.5461C11.6342 12.5406 11.6594 12.5315 11.693 12.5187C11.7605 12.493 11.8607 12.4529 11.9827 12.3987C12.2296 12.289 12.551 12.1276 12.8654 11.918C13.555 11.4582 13.9201 10.9692 13.9201 10.5L13.9201 10.4985C13.9208 10.0262 13.7543 9.56889 13.4502 9.20755C13.146 8.84622 12.7238 8.60419 12.2582 8.52434Z"/>
                    <path d="M12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5H12.01C12.5623 18.5 13.01 18.0523 13.01 17.5C13.01 16.9477 12.5623 16.5 12.01 16.5H12Z"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12.5C1 6.42487 5.92487 1.5 12 1.5C18.0751 1.5 23 6.42487 23 12.5C23 18.5751 18.0751 23.5 12 23.5C5.92487 23.5 1 18.5751 1 12.5ZM12 3.5C7.02944 3.5 3 7.52944 3 12.5C3 17.4706 7.02944 21.5 12 21.5C16.9706 21.5 21 17.4706 21 12.5C21 7.52944 16.9706 3.5 12 3.5Z"/>
                </svg>
                </span>
                <span class="description">${ticket.name}</span> 
            </div>
            <span class="price">$${ticket.price}</span>
        `;

        const controlDiv = document.createElement('div');
        controlDiv.classList.add('control');
        controlDiv.innerHTML = `
            <button class="limit minus">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <rect x="1" y="1.5" width="22" height="22" rx="11"/>
                    <rect x="1" y="1.5" width="22" height="22" rx="11"  stroke-width="2"/>
                    <path d="M5 11.5C4.44772 11.5 4 11.9477 4 12.5C4 13.0523 4.44772 13.5 5 13.5H19C19.5523 13.5 20 13.0523 20 12.5C20 11.9477 19.5523 11.5 19 11.5H5Z"/>
                </svg>
            </button>
            <span class="qty">${ticket.qty}</span>
            <button class="plus">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <rect y="0.5" width="24" height="24" rx="12"/>
                    <path d="M13 5.5C13 4.94772 12.5523 4.5 12 4.5C11.4477 4.5 11 4.94772 11 5.5V11.5H5C4.44772 11.5 4 11.9477 4 12.5C4 13.0523 4.44772 13.5 5 13.5H11V19.5C11 20.0523 11.4477 20.5 12 20.5C12.5523 20.5 13 20.0523 13 19.5V13.5H19C19.5523 13.5 20 13.0523 20 12.5C20 11.9477 19.5523 11.5 19 11.5H13V5.5Z"/>
                </svg>
            </button>
        `;

        ticketDiv.appendChild(infoDiv);
        ticketDiv.appendChild(controlDiv);
        container.appendChild(ticketDiv);
        container.appendChild(document.createElement('hr')); 
        
        const minusButton = controlDiv.querySelector('.minus');
        const plusButton = controlDiv.querySelector('.plus');
        const qtySpan = controlDiv.querySelector('.qty');

        minusButton.addEventListener('click', () => updateQuantity(ticket.name, -1));
        plusButton.addEventListener('click', () => updateQuantity(ticket.name, 1));
}

function updateQuantity(ticketName, change) { // Quantity Update 
    const tickets = ticketOptions(); 
    const index = tickets.findIndex(t => t.name === ticketName); 

    if (index !== -1) {
        const newTickets = [...tickets];
        newTickets[index].qty = Math.max(0, newTickets[index].qty + change);
        setTicketOptions(newTickets); // Update state
    }
}

// Navigation
function activateLink(event) { // Handle Links
    // Ignore External Links
    const href = this.getAttribute('href');
    if (!href.startsWith('#')) {
        return
    }

    event.preventDefault();

    // Active Class - Nav
    navLinks.forEach(link => link.classList.remove('active')); 
    const matchingNavLinks = document.querySelectorAll(`nav a[href="${href}"]`); 
    matchingNavLinks.forEach(link => link.classList.add('active'));

  // Active Class - Footer 
    footerLinks.forEach(link => link.classList.remove('active'));
    const matchingFooterLinks = document.querySelectorAll(`footer a[href="${href}"]`);
    matchingFooterLinks.forEach(link => link.classList.add('active'))

    // Hidden Class
    let matchFound = false;
    pages.forEach(page => {
        if (page.id === href.slice(1)) {
            page.classList.remove('hidden');
            matchFound = true;
        } 
        else {
            page.classList.add('hidden');
        }
    });
    // Fallback Hidden Class
    if (!matchFound) {
        const homePage = document.getElementById('home');
        homePage.classList.remove('hidden');
    }
    // Scroll to section
    window.location.href = href;

}

// Global Selectors
const navLinks = document.querySelectorAll('nav a');
const footerLinks = document.querySelectorAll('footer a');
const heroCTA = document.querySelector('#hero .cta a');
const faqLink = document.querySelector('#faq .tickets a');

const pages = document.querySelectorAll('main>section');

// Event Listeners
navLinks.forEach(link => {
    link.addEventListener('click', activateLink);
});
footerLinks.forEach(link => {
    link.addEventListener('click', activateLink);
});

heroCTA.addEventListener('click', activateLink);
faqLink.addEventListener('click', activateLink);
