// Transportation Services Website - Main JavaScript

// Global Variables
let customers = [];
let admins = [];
let vehicles = [];
let currentCustomer = null;
let currentAdmin = null;
let selectedTransport = null;
let voiceRecognition = null;
let isListening = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setupEventListeners();
    setupVoiceRecognition();
});

// Initialize sample data
function initializeData() {
    // Sample admin
    admins.push({
        name: 'Olawale Abdul-ganiyu',
        email: 'admin@transport.com',
        phone: '+1 (555) 123-4567',
        password: 'admin123'
    });

    // Sample customers
    customers.push({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 234-5678',
        country: 'USA',
        password: 'customer123',
        accountNumber: '7',
        balance: 1500.00,
        passportId: 'US123456789',
        driversLicense: 'DL123456',
        address: '123 Main St, New York, NY 10001',
        registeredDate: new Date().toISOString()
    });

    customers.push({
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 (555) 345-6789',
        country: 'Canada',
        password: 'customer123',
        accountNumber: '3',
        balance: 2500.00,
        passportId: 'CA987654321',
        driversLicense: 'DL789012',
        address: '456 Oak Ave, Toronto, ON M4W 1A5',
        registeredDate: new Date().toISOString()
    });

    // Sample vehicles
    vehicles.push({
        id: 1,
        owner: 'John Doe',
        type: 'Taxi',
        vehicleNumber: 'TX-1234',
        plateRegistration: 'ABC-1234',
        color: 'Yellow',
        capacity: 4,
        status: 'Active'
    });

    vehicles.push({
        id: 2,
        owner: 'Jane Smith',
        type: 'Truck',
        vehicleNumber: 'TR-5678',
        plateRegistration: 'XYZ-5678',
        color: 'Blue',
        capacity: 2000,
        status: 'Active'
    });
}

// Setup event listeners
function setupEventListeners() {
    // Admin login
    document.getElementById('admin-login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        adminLogin();
    });

    // Admin register
    document.getElementById('admin-register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        adminRegister();
    });

    // Customer login
    document.getElementById('customer-login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        customerLogin();
    });

    // Customer register
    document.getElementById('customer-register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        customerRegister();
    });

    // Bank transfer form
    document.getElementById('bank-transfer-form').addEventListener('submit', function(e) {
        e.preventDefault();
        customerTransfer();
    });

    // Transport options
    document.querySelectorAll('.transport-option').forEach(option => {
        option.addEventListener('click', function() {
            selectTransport(this);
        });
    });

    // Bank type change for customer
    document.getElementById('transfer-bank').addEventListener('change', function() {
        const swiftGroup = document.getElementById('swift-code-group');
        if (this.value === 'international') {
            swiftGroup.style.display = 'block';
        } else {
            swiftGroup.style.display = 'none';
        }
    });
}

// Setup Voice Recognition
function setupVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        voiceRecognition = new SpeechRecognition();
        voiceRecognition.continuous = false;
        voiceRecognition.interimResults = true;
        voiceRecognition.lang = 'en-US';

        voiceRecognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('voice-text').textContent = transcript;
            
            // Simulate person detection
            const detectedPerson = detectPersonType(transcript);
            document.getElementById('detected-person').textContent = detectedPerson;
        };

        voiceRecognition.onend = function() {
            isListening = false;
            document.getElementById('voice-btn').classList.remove('listening');
            document.getElementById('voice-btn').innerHTML = '<span>🎤</span> Start Voice Recognition';
        };

        voiceRecognition.onerror = function(event) {
            console.error('Voice recognition error:', event.error);
            isListening = false;
            document.getElementById('voice-btn').classList.remove('listening');
        };
    }
}

// Detect person type from speech (simulated)
function detectPersonType(speech) {
    const lowerSpeech = speech.toLowerCase();
    
    if (lowerSpeech.includes('child') || lowerSpeech.includes('kid') || lowerSpeech.includes('boy') || lowerSpeech.includes('girl')) {
        if (lowerSpeech.includes('boy')) return 'Boy (Child)';
        if (lowerSpeech.includes('girl')) return 'Girl (Child)';
        return 'Child';
    }
    
    if (lowerSpeech.includes('elderly') || lowerSpeech.includes('old') || lowerSpeech.includes('senior')) {
        return 'Elderly Person';
    }
    
    if (lowerSpeech.includes('woman') || lowerSpeech.includes('female') || lowerSpeech.includes('lady')) {
        return 'Woman';
    }
    
    if (lowerSpeech.includes('man') || lowerSpeech.includes('male') || lowerSpeech.includes('gentleman')) {
        return 'Man';
    }
    
    return 'Adult (Detection complete)';
}

// Toggle voice recognition
function toggleVoiceRecognition() {
    if (!voiceRecognition) {
        alert('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
        return;
    }

    if (isListening) {
        voiceRecognition.stop();
    } else {
        document.getElementById('recognition-result').style.display = 'block';
        document.getElementById('voice-btn').classList.add('listening');
        document.getElementById('voice-btn').innerHTML = '<span>🔴</span> Listening...';
        voiceRecognition.start();
        isListening = true;
    }
}

// Navigation functions
function showAdminCover() {
    document.getElementById('admin-cover').style.display = 'flex';
    document.getElementById('customer-cover').style.display = 'none';
    document.getElementById('customer-dashboard').classList.remove('active');
    document.getElementById('admin-dashboard').classList.remove('active');
}

function showCustomerCover() {
    document.getElementById('admin-cover').style.display = 'none';
    document.getElementById('customer-cover').style.display = 'flex';
    document.getElementById('customer-dashboard').classList.remove('active');
    document.getElementById('admin-dashboard').classList.remove('active');
}

function showAdminRegister() {
    document.getElementById('admin-login-form').style.display = 'none';
    document.getElementById('admin-register-form').style.display = 'block';
}

function showAdminLogin() {
    document.getElementById('admin-login-form').style.display = 'block';
    document.getElementById('admin-register-form').style.display = 'none';
}

function showCustomerRegister() {
    document.getElementById('customer-login-form').style.display = 'none';
    document.getElementById('customer-register-form').style.display = 'block';
}

function showCustomerLogin() {
    document.getElementById('customer-login-form').style.display = 'block';
    document.getElementById('customer-register-form').style.display = 'none';
}

// Admin authentication
function adminLogin() {
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    const admin = admins.find(a => a.email === email && a.password === password);
    
    if (admin) {
        currentAdmin = admin;
        document.getElementById('admin-cover').style.display = 'none';
        document.getElementById('admin-dashboard').classList.add('active');
        document.getElementById('admin-welcome').textContent = `Welcome, ${admin.name}`;
        loadAdminData();
    } else {
        alert('Invalid admin credentials. Please try again.');
    }
}

function adminRegister() {
    const name = document.getElementById('admin-reg-name').value;
    const email = document.getElementById('admin-reg-email').value;
    const phone = document.getElementById('admin-reg-phone').value;
    const password = document.getElementById('admin-reg-password').value;

    const newAdmin = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    admins.push(newAdmin);
    alert('Admin registration successful! Please login.');
    showAdminLogin();
}

// Customer authentication
function customerLogin() {
    const emailOrAccount = document.getElementById('customer-email').value;
    const password = document.getElementById('customer-password').value;

    const customer = customers.find(c => 
        (c.email === emailOrAccount || c.accountNumber === emailOrAccount) && 
        c.password === password
    );
    
    if (customer) {
        currentCustomer = customer;
        document.getElementById('customer-cover').style.display = 'none';
        document.getElementById('customer-dashboard').classList.add('active');
        document.getElementById('customer-welcome').textContent = `Welcome, ${customer.name}`;
        document.getElementById('customer-balance').textContent = customer.balance.toFixed(2);
        document.getElementById('customer-account-num').textContent = customer.accountNumber;
    } else {
        alert('Invalid customer credentials. Please try again.');
    }
}

function customerRegister() {
    const name = document.getElementById('cust-reg-name').value;
    const email = document.getElementById('cust-reg-email').value;
    const phone = document.getElementById('cust-reg-phone').value;
    const country = document.getElementById('cust-reg-country').value;
    const password = document.getElementById('cust-reg-password').value;

    // Generate random account number (1-10)
    const accountNumber = Math.floor(Math.random() * 10) + 1;

    const newCustomer = {
        id: customers.length + 1,
        name: name,
        email: email,
        phone: phone,
        country: country,
        password: password,
        accountNumber: accountNumber.toString(),
        balance: 0.00,
        passportId: 'Pending',
        driversLicense: 'Pending',
        address: 'Pending',
        registeredDate: new Date().toISOString()
    };

    customers.push(newCustomer);
    alert(`Registration successful! Your account number is: ${accountNumber}`);
    showCustomerLogin();
}

// Logout function
function logout() {
    currentCustomer = null;
    currentAdmin = null;
    document.getElementById('customer-dashboard').classList.remove('active');
    document.getElementById('admin-dashboard').classList.remove('active');
    showCustomerCover();
}

// Transportation selection
function selectTransport(element) {
    document.querySelectorAll('.transport-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedTransport = {
        type: element.dataset.transport,
        rate: parseFloat(element.dataset.rate)
    };
}

// Calculate price
function calculatePrice() {
    if (!selectedTransport) {
        alert('Please select a transportation mode.');
        return;
    }

    const distance = parseFloat(document.getElementById('distance').value);
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const passengers = parseInt(document.getElementById('passengers').value) || 1;

    if (!distance || distance <= 0) {
        alert('Please enter a valid distance.');
        return;
    }

    // Calculate base price (per 10 meters)
    const basePrice = (distance / 10) * selectedTransport.rate;
    
    // Add weight surcharge ($0.01 per kg)
    const weightSurcharge = weight * 0.01;
    
    // Add passenger surcharge ($5 per additional passenger)
    const passengerSurcharge = (passengers - 1) * 5;
    
    // Calculate subtotal
    const subtotal = basePrice + weightSurcharge + passengerSurcharge;
    
    // Calculate admin fee (5%)
    const adminFee = subtotal * 0.05;
    
    // Calculate total
    const total = subtotal + adminFee;

    // Calculate estimated time (simplified)
    let speed = 50; // meters per minute (default)
    switch(selectedTransport.type) {
        case 'walk': speed = 5; break;
        case 'motorcycle': speed = 80; break;
        case 'taxi': speed = 60; break;
        case 'bus': speed = 40; break;
        case 'train': speed = 100; break;
        case 'plane': speed = 500; break;
        case 'ship': speed = 30; break;
        case 'truck': speed = 45; break;
    }
    const timeMinutes = Math.ceil(distance / speed);
    const timeHours = Math.floor(timeMinutes / 60);
    const timeMins = timeMinutes % 60;
    const timeString = timeHours > 0 ? `${timeHours}h ${timeMins}m` : `${timeMins}m`;

    // Display results
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('result-transport').textContent = selectedTransport.type.charAt(0).toUpperCase() + selectedTransport.type.slice(1);
    document.getElementById('result-time').textContent = timeString;
    document.getElementById('result-distance').textContent = `${distance.toLocaleString()} meters`;
    document.getElementById('result-weight').textContent = `${weight} kg`;
    document.getElementById('result-passengers').textContent = passengers;
    document.getElementById('result-rate').textContent = `$${selectedTransport.rate.toFixed(2)} per 10m`;
    document.getElementById('result-admin-fee').textContent = `$${adminFee.toFixed(2)}`;
    document.getElementById('result-total').textContent = `$${total.toFixed(2)}`;

    // Update receipt
    updateReceipt(total, adminFee, subtotal, timeString, distance, weight, passengers);
}

// Update receipt
function updateReceipt(total, adminFee, subtotal, timeString, distance, weight, passengers) {
    const now = new Date();
    document.getElementById('receipt-date').textContent = now.toLocaleString();
    
    if (currentCustomer) {
        document.getElementById('receipt-name').textContent = currentCustomer.name;
        document.getElementById('receipt-account').textContent = currentCustomer.accountNumber;
    }
    
    document.getElementById('receipt-transport').textContent = selectedTransport.type.charAt(0).toUpperCase() + selectedTransport.type.slice(1);
    document.getElementById('receipt-from').textContent = document.getElementById('start-location').value || 'Not specified';
    document.getElementById('receipt-to').textContent = document.getElementById('destination').value || 'Not specified';
    document.getElementById('receipt-distance').textContent = `${distance.toLocaleString()} meters`;
    document.getElementById('receipt-weight').textContent = `${weight} kg`;
    document.getElementById('receipt-time').textContent = timeString;
    document.getElementById('receipt-rate').textContent = `$${selectedTransport.rate.toFixed(2)}`;
    document.getElementById('receipt-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('receipt-admin-fee').textContent = `$${adminFee.toFixed(2)}`;
    document.getElementById('receipt-total').textContent = total.toFixed(2);
}

// Print receipt
function printReceipt() {
    document.getElementById('printable-receipt').classList.add('show');
    window.print();
    setTimeout(() => {
        document.getElementById('printable-receipt').classList.remove('show');
    }, 1000);
}

// Customer bank transfer
function customerTransfer() {
    if (!currentCustomer) {
        alert('Please login first.');
        return;
    }

    const name = document.getElementById('transfer-name').value;
    const bank = document.getElementById('transfer-bank').value;
    const account = document.getElementById('transfer-account').value;
    const city = document.getElementById('transfer-city').value;
    const occupation = document.getElementById('transfer-occupation').value;
    const amount = parseFloat(document.getElementById('transfer-amount').value);

    if (amount > currentCustomer.balance) {
        alert('Insufficient balance.');
        return;
    }

    // Deduct amount from customer balance
    currentCustomer.balance -= amount;
    
    // Update display
    document.getElementById('customer-balance').textContent = currentCustomer.balance.toFixed(2);
    
    // Clear form
    document.getElementById('bank-transfer-form').reset();
    
    alert(`Successfully transferred $${amount.toFixed(2)} to ${name} at ${bank}.\nYour new balance is $${currentCustomer.balance.toFixed(2)}`);
}

// Load admin data
function loadAdminData() {
    loadCustomersTable();
    loadVehiclesTable();
    populateCustomerSelect();
}

// Load customers table
function loadCustomersTable() {
    const tbody = document.getElementById('customers-table-body');
    tbody.innerHTML = '';

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.country}</td>
            <td>${customer.passportId}</td>
            <td>${customer.driversLicense}</td>
            <td>${customer.address}</td>
            <td>${customer.accountNumber}</td>
            <td>$${customer.balance.toFixed(2)}</td>
            <td>
                <button onclick="viewCustomerDetails(${customer.id})" style="padding: 5px 10px; margin: 2px;">View</button>
                <button onclick="editCustomer(${customer.id})" style="padding: 5px 10px; margin: 2px;">Edit</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load vehicles table
function loadVehiclesTable() {
    const tbody = document.getElementById('vehicles-table-body');
    tbody.innerHTML = '';

    vehicles.forEach(vehicle => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vehicle.owner}</td>
            <td>${vehicle.type}</td>
            <td>${vehicle.vehicleNumber}</td>
            <td>${vehicle.plateRegistration}</td>
            <td>${vehicle.color}</td>
            <td>${vehicle.capacity} kg</td>
            <td><span style="color: green;">${vehicle.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Populate customer select dropdown
function populateCustomerSelect() {
    const select = document.getElementById('edit-customer-select');
    select.innerHTML = '<option value="">Select customer</option>';
    
    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = `${customer.name} (${customer.accountNumber})`;
        select.appendChild(option);
    });
}

// Show admin section
function showAdminSection(section) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
    
    // Remove active class from menu items
    document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
    
    // Show selected section
    document.getElementById(`admin-${section}`).style.display = 'block';
    
    // Add active class to clicked menu item
    event.target.classList.add('active');
}

// Update customer account
function updateCustomerAccount() {
    const customerId = parseInt(document.getElementById('edit-customer-select').value);
    const action = document.getElementById('account-action').value;
    const amount = parseFloat(document.getElementById('account-amount').value);
    const description = document.getElementById('account-description').value;

    if (!customerId || !amount || amount <= 0) {
        alert('Please select a customer and enter a valid amount.');
        return;
    }

    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        if (action === 'credit') {
            customer.balance += amount;
        } else {
            if (amount > customer.balance) {
                alert('Insufficient balance for debit.');
                return;
            }
            customer.balance -= amount;
        }

        loadCustomersTable();
        alert(`Account ${action}ed successfully! New balance: $${customer.balance.toFixed(2)}`);
        
        // Clear form
        document.getElementById('account-amount').value = '';
        document.getElementById('account-description').value = '';
    }
}

// Admin transfer
function adminTransfer() {
    const name = document.getElementById('admin-transfer-name').value;
    const bank = document.getElementById('admin-transfer-bank').value;
    const account = document.getElementById('admin-transfer-account').value;
    const city = document.getElementById('admin-transfer-city').value;
    const amount = parseFloat(document.getElementById('admin-transfer-amount').value);
    const swift = document.getElementById('admin-transfer-swift').value;
    const swiss = document.getElementById('admin-transfer-swiss').value;

    if (!name || !account || !amount || amount <= 0) {
        alert('Please fill in all required fields.');
        return;
    }

    let transferDetails = `Successfully transferred $${amount.toFixed(2)} to ${name}\n`;
    transferDetails += `Bank: ${bank}\n`;
    transferDetails += `Account: ${account}\n`;
    transferDetails += `City: ${city}\n`;
    
    if (bank === 'international' && swift) {
        transferDetails += `SWIFT Code: ${swift}\n`;
    }
    if (bank === 'international' && swiss) {
        transferDetails += `Swiss Code: ${swiss}\n`;
    }

    alert(transferDetails);
    
    // Clear form
    document.querySelectorAll('#admin-transfers input').forEach(input => input.value = '');
}

// Send message to owner
function sendMessage() {
    const name = document.getElementById('message-name').value;
    const email = document.getElementById('message-email').value;
    const subject = document.getElementById('message-subject').value;
    const content = document.getElementById('message-content').value;

    if (!name || !email || !subject || !content) {
        alert('Please fill in all fields.');
        return;
    }

    // In a real application, this would send an actual email
    alert(`Message prepared to send to adeganglobal@gmail.com\n\nFrom: ${name} (${email})\nSubject: ${subject}\n\n${content}\n\nMessage would be sent via email service.`);
    
    // Clear form
    document.getElementById('message-name').value = '';
    document.getElementById('message-email').value = '';
    document.getElementById('message-subject').value = '';
    document.getElementById('message-content').value = '';
}

// View customer details
function viewCustomerDetails(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        alert(`Customer Details:\n\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nCountry: ${customer.country}\nAccount #: ${customer.accountNumber}\nBalance: $${customer.balance.toFixed(2)}\nPassport ID: ${customer.passportId}\nDriver's License: ${customer.driversLicense}\nAddress: ${customer.address}\nRegistered: ${new Date(customer.registeredDate).toLocaleDateString()}`);
    }
}

// Edit customer
function editCustomer(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
        const newBalance = prompt(`Edit balance for ${customer.name}:`, customer.balance);
        if (newBalance !== null && !isNaN(newBalance)) {
            customer.balance = parseFloat(newBalance);
            loadCustomersTable();
            alert('Customer balance updated successfully!');
        }
    }
}