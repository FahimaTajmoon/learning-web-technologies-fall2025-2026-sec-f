
document.addEventListener('DOMContentLoaded', function() {
   
    const donationChart = document.getElementById('donationChart');
    
    if (donationChart) {
        const ctx = donationChart.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Blood Donations',
                    data: [0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    borderColor: 'rgba(211, 47, 47, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(211, 47, 47, 1)',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            family: "'Poppins', sans-serif"
                        },
                        bodyFont: {
                            family: "'Roboto', sans-serif"
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 2,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
    }
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const dashboardSidebar = document.querySelector('.dashboard-sidebar');
    
    if (mobileMenuToggle && dashboardSidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            dashboardSidebar.classList.toggle('active');
        });
        
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 992) {
                if (!dashboardSidebar.contains(event.target) && 
                    !mobileMenuToggle.contains(event.target) && 
                    dashboardSidebar.classList.contains('active')) {
                    dashboardSidebar.classList.remove('active');
                }
            }
        });
    }
    
    const toggleStatusBtn = document.querySelector('.toggle-status-btn');
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.donor-status span');
    
    if (toggleStatusBtn && statusIndicator && statusText) {
        toggleStatusBtn.addEventListener('click', function() {
            if (statusIndicator.classList.contains('active')) {
                statusIndicator.classList.remove('active');
                statusIndicator.style.backgroundColor = 'var(--danger)';
                statusText.textContent = 'Not Available';
                toggleStatusBtn.textContent = 'Make Available';
            } else {
                statusIndicator.classList.add('active');
                statusIndicator.style.backgroundColor = 'var(--success)';
                statusText.textContent = 'Available for Donation';
                toggleStatusBtn.textContent = 'Make Unavailable';
            }
        });
    }
    
    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach(action => {
        action.addEventListener('click', function(e) {
            const actionText = this.querySelector('h4').textContent;
            
            if (actionText === 'Donate Blood') {
                e.preventDefault();
                openModal('donateBloodModal');
            } else if (actionText === 'Request Blood') {
                e.preventDefault();
                openModal('requestBloodModal');
            }
        });
    });
    
    const responseButtons = document.querySelectorAll('.blood-request-item .btn-primary');
    responseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const requestItem = this.closest('.blood-request-item');
            const hospitalName = requestItem.querySelector('p').textContent;
            const bloodType = requestItem.querySelector('h4').textContent;
            
            if (confirm(`Respond to blood request from ${hospitalName} for ${bloodType}?`)) {
                this.textContent = 'Responded';
                this.disabled = true;
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                updateNotificationCount(-1);
            }
        });
    });
    
    const campaignJoinButtons = document.querySelectorAll('.campaign-item .btn-primary');
    campaignJoinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const campaignItem = this.closest('.campaign-item');
            const campaignName = campaignItem.querySelector('h4').textContent;
            
            if (this.textContent === 'Join') {
                this.textContent = 'Joined';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
            }
        });
    });
    
    const rewardButtons = document.querySelectorAll('.reward-item .btn-outline');
    rewardButtons.forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', function() {
                const rewardItem = this.closest('.reward-item');
                const rewardName = rewardItem.querySelector('h5').textContent;
                const pointsNeeded = parseInt(rewardItem.querySelector('p').textContent);
                
                if (confirm(`Redeem ${rewardName} for ${pointsNeeded} points?`)) {
                    this.textContent = 'Redeemed';
                    this.disabled = true;
                    this.classList.remove('btn-outline');
                    this.classList.add('btn-success');
                }
            });
        }
    });
    
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach(item => {
        item.addEventListener('click', function() {
            const userName = this.querySelector('h4').textContent;
            
            const badge = this.querySelector('.conversation-badge');
            if (badge) {
                badge.remove();
                this.classList.remove('unread');
                updateNotificationCount(-1);
            }
        });
    });
    
    const donateBloodForm = document.getElementById('donateBloodForm');
    if (donateBloodForm) {
        donateBloodForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const donationType = document.getElementById('donationType').value;
            const donationDate = document.getElementById('donationDate').value;
            const donationLocation = document.getElementById('donationLocation').value;
            
            console.log('Donation form submitted:', { donationType, donationDate, donationLocation });
            closeModal();
            donateBloodForm.reset();
        });
    }
    
    const requestBloodForm = document.getElementById('requestBloodForm');
    if (requestBloodForm) {
        requestBloodForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const patientName = document.getElementById('patientName').value;
            const bloodTypeNeeded = document.getElementById('bloodTypeNeeded').value;
            const hospitalName = document.getElementById('hospitalName').value;
            const urgencyLevel = document.getElementById('urgencyLevel').value;
            
            console.log('Blood request submitted:', { patientName, bloodTypeNeeded, hospitalName, urgencyLevel });
            closeModal();
            requestBloodForm.reset();
        });
    }
    
    const citySelect = document.getElementById('citySelect');
    const ambulanceResults = document.getElementById('ambulanceResults');
    
    const ambulanceData = {
        dhaka: [
            {
                id: 1,
                name: "Dhaka Central Ambulance Service",
                service: "24/7 Emergency Service",
                phone: "+880 1711 123456",
                availability: "available",
                responseTime: "15-20 mins",
                type: "AC Advanced Life Support",
                driver: "Abdul Karim",
                rating: "4.5/5",
                location: "Motijheel, Dhaka",
                features: ["Oxygen", "First Aid Kit", "ECG Monitor", "Stretcher"]
            },
            {
                id: 2,
                name: "Bangladesh Red Crescent Ambulance",
                service: "24/7 Emergency & Transfer",
                phone: "+880 1712 234567",
                availability: "available",
                responseTime: "20-25 mins",
                type: "Basic Life Support",
                driver: "Mohammad Ali",
                rating: "4.3/5",
                location: "Farmgate, Dhaka",
                features: ["Oxygen", "First Aid Kit", "Stretcher"]
            }
        ]
       
    };
    
    if (citySelect && ambulanceResults) {
        citySelect.addEventListener('change', function() {
            const selectedCity = this.value;
            
            if (!selectedCity) {
                ambulanceResults.innerHTML = `
                    <div class="no-selection">
                        <i class="fas fa-ambulance"></i>
                        <p>Please select a city to view available ambulance services</p>
                    </div>
                `;
                return;
            }
            
            ambulanceResults.innerHTML = `
                <div class="ambulance-loading">
                    <div class="loading-spinner"></div>
                    <p>Loading ambulance services for ${this.options[this.selectedIndex].text}...</p>
                </div>
            `;
            
            setTimeout(() => {
                displayAmbulanceServices(selectedCity);
            }, 800);
        });
    }
    
    function displayAmbulanceServices(city) {
        const ambulances = ambulanceData[city] || [];
        
        if (ambulances.length === 0) {
            ambulanceResults.innerHTML = `
                <div class="ambulance-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>No ambulance services available in this city.</p>
                </div>
            `;
            return;
        }
        
        let ambulanceListHTML = '<div class="ambulance-list">';
        
        ambulances.forEach(ambulance => {
            let statusText, statusClass;
            switch(ambulance.availability) {
                case 'available':
                    statusText = 'Available';
                    statusClass = 'available';
                    break;
                case 'busy':
                    statusText = 'Busy';
                    statusClass = 'busy';
                    break;
                case 'offline':
                    statusText = 'Offline';
                    statusClass = 'offline';
                    break;
            }
            
            ambulanceListHTML += `
                <div class="ambulance-item">
                    <div class="ambulance-icon">
                        <i class="fas fa-ambulance"></i>
                    </div>
                    <div class="ambulance-info">
                        <h4>${ambulance.name}</h4>
                        <div class="ambulance-service">${ambulance.service}</div>
                        <div class="ambulance-details">
                            <div class="ambulance-detail">
                                <i class="fas fa-clock"></i>
                                <span>Response: ${ambulance.responseTime}</span>
                            </div>
                            <div class="ambulance-detail">
                                <i class="fas fa-phone"></i>
                                <span>${ambulance.phone}</span>
                            </div>
                            <div class="ambulance-detail">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${ambulance.location}</span>
                            </div>
                        </div>
                        <div class="ambulance-status ${statusClass}">
                            ${statusText}
                        </div>
                    </div>
                </div>
            `;
        });
        
        ambulanceListHTML += '</div>';
        ambulanceResults.innerHTML = ambulanceListHTML;
    }
    
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none');
    document.body.style.overflow = 'auto';
}

function updateNotificationCount(change) {
    const notificationCount = document.querySelector('.notification-count');
    if (notificationCount) {
        let c = parseInt(notificationCount.textContent);
        c += change;
        if (c <= 0) {
            notificationCount.style.display = 'none';
        } else {
            notificationCount.style.display = 'flex';
            notificationCount.textContent = c;
        }
    }
}
