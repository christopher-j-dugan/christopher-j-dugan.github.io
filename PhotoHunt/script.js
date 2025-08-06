class PhotoHuntGame {
    constructor() {
        this.gameData = null;
        this.currentRound = 0;
        this.totalScore = 0;
        this.roundScore = 0;
        this.foundDifferences = [];
        this.hintFoundDifferences = [];
        this.currentTotalDifferences = 0;
        this.hintsUsed = 0;
        this.hintsUsedThisRound = 0;
        this.maxHints = 3;
        this.timeLeft = 60;
        this.timerInterval = null;
        this.gameActive = false;
        this.roundActive = false;
        this.audioContext = null;
        this.tickingInterval = null;
        this.baseRoundScore = 0;
        this.bonusPoints = 0;
        this.bonusType = '';
        this.circlesVisible = true;
        
        this.initializeElements();
        this.bindEvents();
        this.initializeTouchHandling();
        this.initializeAudio();
        this.loadGameData();
    }

    initializeElements() {
        this.elements = {
            totalScore: document.getElementById('total-score'),
            currentRound: document.getElementById('current-round'),
            totalRounds: document.getElementById('total-rounds'),
            timer: document.getElementById('timer'),
            foundCount: document.getElementById('found-count'),
            totalDifferences: document.getElementById('total-differences'),
            gameStatus: document.getElementById('game-status'),
            gameArea: document.getElementById('game-area'),
            roundComplete: document.getElementById('round-complete'),
            gameComplete: document.getElementById('game-complete'),
            originalImage: document.getElementById('original-image'),
            modifiedImage: document.getElementById('modified-image'),
            originalOverlay: document.getElementById('original-overlay'),
            modifiedOverlay: document.getElementById('modified-overlay'),
            startButton: document.getElementById('start-button'),

            nextRoundButton: document.getElementById('next-round-button'),
            playAgainButton: document.getElementById('play-again-button'),
            roundResultTitle: document.getElementById('round-result-title'),
            finalFoundCount: document.getElementById('final-found-count'),
            finalTotalDifferences: document.getElementById('final-total-differences'),
            baseRoundScore: document.getElementById('base-round-score'),
            bonusLine: document.getElementById('bonus-line'),
            roundScore: document.getElementById('round-score'),
            roundTotalScore: document.getElementById('round-total-score'),
            finalScore: document.getElementById('final-score'),
            hint1: document.getElementById('hint-1'),
            hint2: document.getElementById('hint-2'),
            hint3: document.getElementById('hint-3'),
            answerKeyButton: document.getElementById('answer-key-button'),
            backToResultsButton: document.getElementById('back-to-results-button'),
            answerKeyView: document.getElementById('answer-key-view'),
            answerKeyRound: document.getElementById('answer-key-round'),
            answerOriginalImage: document.getElementById('answer-original-image'),
            answerModifiedImage: document.getElementById('answer-modified-image'),
            answerOriginalOverlay: document.getElementById('answer-original-overlay'),
            answerModifiedOverlay: document.getElementById('answer-modified-overlay'),
            toggleCirclesButton: document.getElementById('toggle-circles-button')
        };
    }

    bindEvents() {
        this.elements.startButton.addEventListener('click', () => this.startGame());
        this.elements.nextRoundButton.addEventListener('click', () => this.nextRound());
        this.elements.playAgainButton.addEventListener('click', () => this.resetGame());
        
        // Add click listeners to both images
        this.elements.originalImage.addEventListener('click', (e) => this.handleImageClick(e, 'original'));
        this.elements.modifiedImage.addEventListener('click', (e) => this.handleImageClick(e, 'modified'));
        
        // Add load events to images to setup overlays
        this.elements.originalImage.addEventListener('load', () => this.setupImageOverlay('original'));
        this.elements.modifiedImage.addEventListener('load', () => this.setupImageOverlay('modified'));
        
        // Add hint click listeners
        this.elements.hint1.addEventListener('click', () => this.useHint());
        this.elements.hint2.addEventListener('click', () => this.useHint());
        this.elements.hint3.addEventListener('click', () => this.useHint());
        
        // Add answer key listeners
        this.elements.answerKeyButton.addEventListener('click', () => this.showAnswerKey());
        this.elements.backToResultsButton.addEventListener('click', () => this.hideAnswerKey());
        this.elements.toggleCirclesButton.addEventListener('click', () => this.toggleCircles());
        
        // Add load events for answer key images
        this.elements.answerOriginalImage.addEventListener('load', () => this.setupAnswerKeyOverlay('original'));
        this.elements.answerModifiedImage.addEventListener('load', () => this.setupAnswerKeyOverlay('modified'));
        
        // Add tap-to-zoom functionality for answer key images
        this.elements.answerOriginalImage.addEventListener('click', (e) => this.toggleImageZoom(e));
        this.elements.answerModifiedImage.addEventListener('click', (e) => this.toggleImageZoom(e));
        


    }



    loadGameData() {
        // Embedded game configuration
        this.gameData = {
            "Game": {
                "Rounds": [
                    {
                        "image": "Johnny",
                        "time": 90,
                        "coords": [
                            {
                                "x": 149,
                                "y": 1275,
                                "radius": 76
                            },
                            {
                                "x": 253,
                                "y": 541,
                                "radius": 55
                            },
                            {
                                "x": 517,
                                "y": 1355,
                                "radius": 85
                            },
                            {
                                "x": 959,
                                "y": 1457,
                                "radius": 132
                            },
                            {
                                "x": 808,
                                "y": 893,
                                "radius": 44
                            },
                            {
                                "x": 461,
                                "y": 972,
                                "radius": 40
                            },
                            {
                                "x": 436,
                                "y": 805,
                                "radius": 62
                            },
                            {
                                "x": 716,
                                "y": 580,
                                "radius": 96
                            },
                            {
                                "x": 483,
                                "y": 622,
                                "radius": 61
                            },
                            {
                                "x": 469,
                                "y": 438,
                                "radius": 68
                            }
                        ]
                    },
                    {
                        "image": "outdoorgroup",
                        "time": 60,
                        "coords": [
                            {
                                "x": 177,
                                "y": 225,
                                "radius": 85
                            },
                            {
                                "x": 716,
                                "y": 380,
                                "radius": 79
                            },
                            {
                                "x": 1414,
                                "y": 356,
                                "radius": 61
                            },
                            {
                                "x": 1357,
                                "y": 629,
                                "radius": 123
                            },
                            {
                                "x": 1328,
                                "y": 1259,
                                "radius": 114
                            },
                            {
                                "x": 1126,
                                "y": 1037,
                                "radius": 94
                            },
                            {
                                "x": 888,
                                "y": 700,
                                "radius": 182
                            },
                            {
                                "x": 371,
                                "y": 935,
                                "radius": 90
                            },
                            {
                                "x": 427,
                                "y": 367,
                                "radius": 79
                            }
                        ]
                    },
                    {
                        "image": "Drinks",
                        "coords": [
                            {
                                "x": 1886,
                                "y": 2244,
                                "radius": 145
                            },
                            {
                                "x": 2288,
                                "y": 2554,
                                "radius": 176
                            },
                            {
                                "x": 2296,
                                "y": 1963,
                                "radius": 131
                            },
                            {
                                "x": 3243,
                                "y": 1825,
                                "radius": 237
                            },
                            {
                                "x": 1822,
                                "y": 1202,
                                "radius": 171
                            },
                            {
                                "x": 2092,
                                "y": 187,
                                "radius": 548
                            },
                            {
                                "x": 3343,
                                "y": 1083,
                                "radius": 102
                            },
                            {
                                "x": 1872,
                                "y": 850,
                                "radius": 127
                            }
                        ]
                    },
                    {
                        "image": "Kids",
                        "time": 90,
                        "coords": [
                            {
                                "x": 73,
                                "y": 528,
                                "radius": 148
                            },
                            {
                                "x": 299,
                                "y": 454,
                                "radius": 87
                            },
                            {
                                "x": 657,
                                "y": 1411,
                                "radius": 140
                            },
                            {
                                "x": 915,
                                "y": 847,
                                "radius": 59
                            },
                            {
                                "x": 990,
                                "y": 516,
                                "radius": 75
                            },
                            {
                                "x": 1183,
                                "y": 517,
                                "radius": 87
                            },
                            {
                                "x": 1478,
                                "y": 1305,
                                "radius": 144
                            },
                            {
                                "x": 1725,
                                "y": 1454,
                                "radius": 89
                            },
                            {
                                "x": 1693,
                                "y": 324,
                                "radius": 92
                            }
                        ]
                    },
                    {
                        "image": "Smon",
                        "time": 90,
                        "coords": [
                            {
                                "x": 752,
                                "y": 772,
                                "radius": 206
                            },
                            {
                                "x": 501,
                                "y": 743,
                                "radius": 48
                            },
                            {
                                "x": 56,
                                "y": 910,
                                "radius": 172
                            },
                            {
                                "x": 95,
                                "y": 464,
                                "radius": 75
                            },
                            {
                                "x": 825,
                                "y": 211,
                                "radius": 51
                            },
                            {
                                "x": 1157,
                                "y": 337,
                                "radius": 70
                            },
                            {
                                "x": 1147,
                                "y": 121,
                                "radius": 49
                            },
                            {
                                "x": 1450,
                                "y": 69,
                                "radius": 79
                            },
                            {
                                "x": 1059,
                                "y": 916,
                                "radius": 98
                            }
                        ]
                    },
                    {
                        "image": "Jordan_Boat",
                        "time": 60,
                        "coords": [
                            {
                                "x": 301,
                                "y": 1421,
                                "radius": 117
                            },
                            {
                                "x": 705,
                                "y": 1390,
                                "radius": 137
                            },
                            {
                                "x": 1030,
                                "y": 1010,
                                "radius": 106
                            },
                            {
                                "x": 346,
                                "y": 950,
                                "radius": 165
                            },
                            {
                                "x": 1073,
                                "y": 573,
                                "radius": 68
                            },
                            {
                                "x": 1028,
                                "y": 365,
                                "radius": 122
                            },
                            {
                                "x": 284,
                                "y": 156,
                                "radius": 178
                            },
                            {
                                "x": 881,
                                "y": 818,
                                "radius": 77
                            }
                        ]
                    },
                    {
                        "image": "Year1",
                        "time": 60,
                        "coords": [
                            {
                                "x": 1172,
                                "y": 608,
                                "radius": 69
                            },
                            {
                                "x": 54,
                                "y": 720,
                                "radius": 63
                            },
                            {
                                "x": 629,
                                "y": 697,
                                "radius": 170
                            },
                            {
                                "x": 901,
                                "y": 533,
                                "radius": 70
                            },
                            {
                                "x": 1097,
                                "y": 306,
                                "radius": 50
                            },
                            {
                                "x": 182,
                                "y": 191,
                                "radius": 121
                            },
                            {
                                "x": 467,
                                "y": 259,
                                "radius": 92
                            },
                            {
                                "x": 503,
                                "y": 906,
                                "radius": 66
                            }
                        ]
                    },
                    {
                        "image": "Carousel",
                        "time": 90,
                        "coords": [
                            {
                                "x": 1002,
                                "y": 313,
                                "radius": 154
                            },
                            {
                                "x": 1296,
                                "y": 991,
                                "radius": 63
                            },
                            {
                                "x": 1056,
                                "y": 1044,
                                "radius": 122
                            },
                            {
                                "x": 1353,
                                "y": 498,
                                "radius": 59
                            },
                            {
                                "x": 212,
                                "y": 310,
                                "radius": 171
                            },
                            {
                                "x": 1711,
                                "y": 367,
                                "radius": 134
                            },
                            {
                                "x": 1714,
                                "y": 93,
                                "radius": 111
                            },
                            {
                                "x": 1702,
                                "y": 638,
                                "radius": 72
                            },
                            {
                                "x": 611,
                                "y": 443,
                                "radius": 173
                            }
                        ]
                    },
                    {
                        "image": "OCMD_group",
                        "time": 60,
                        "coords": [
                            {
                                "x": 195,
                                "y": 239,
                                "radius": 109
                            },
                            {
                                "x": 1462,
                                "y": 860,
                                "radius": 67
                            },
                            {
                                "x": 598,
                                "y": 959,
                                "radius": 84
                            },
                            {
                                "x": 891,
                                "y": 525,
                                "radius": 55
                            },
                            {
                                "x": 1062,
                                "y": 414,
                                "radius": 87
                            },
                            {
                                "x": 899,
                                "y": 236,
                                "radius": 45
                            },
                            {
                                "x": 465,
                                "y": 507,
                                "radius": 63
                            },
                            {
                                "x": 153,
                                "y": 982,
                                "radius": 229
                            }
                        ]
                    }
                ]
            }
        };
        
        this.elements.totalRounds.textContent = this.gameData.Game.Rounds.length;
    }

    initializeTouchHandling() {
        // Prevent pull-to-refresh on the document
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            // Prevent pull-to-refresh if at top of page
            if (e.touches.length > 1) {
                e.preventDefault();
            }
            
            // Only prevent default if we're at the top and trying to pull down
            if (window.pageYOffset === 0 && e.touches[0].clientY > e.touches[0].target.getBoundingClientRect().top) {
                e.preventDefault();
            }
        }, { passive: false });

        // Prevent context menu on long press for game images
        [this.elements.originalImage, this.elements.modifiedImage].forEach(img => {
            img.addEventListener('contextmenu', (e) => e.preventDefault());
            img.addEventListener('touchstart', (e) => {
                // Prevent text selection and other touch behaviors
                e.stopPropagation();
            }, { passive: true });
        });

        // Prevent double-tap zoom on buttons and game elements
        const preventDoubleTap = (element) => {
            let lastTouchEnd = 0;
            element.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, { passive: false });
        };

        // Apply to all buttons and interactive elements
        document.querySelectorAll('button, .hint-icon').forEach(preventDoubleTap);

        // Prevent zoom on game container
        preventDoubleTap(document.querySelector('.game-container'));
    }

    initializeAudio() {
        try {
            // Initialize Web Audio API (modern browsers)
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            this.audioContext = null;
        }
    }

    playTickSound() {
        if (!this.audioContext) return;

        // Create a simple tick sound using Web Audio API
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        // Connect oscillator to gain to output
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Configure the tick sound (short, sharp click)
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
        
        // Very short duration for tick sound
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        // Play the sound
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    playCelebrationSound() {
        if (!this.audioContext) {
            console.log('No audio context available for celebration sound');
            return;
        }

        if (this.audioContext.state === 'suspended') {
            console.log('Audio context suspended, trying to resume...');
            this.audioContext.resume().then(() => {
                this.playCelebrationSound(); // Retry after resuming
            });
            return;
        }

        console.log('🎵 Playing celebration sound!'); // Debug log

        // Create a cheerful ascending melody
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        const duration = 0.2;

        notes.forEach((frequency, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Configure cheerful sound
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            
            // Volume envelope for pleasant sound
            const startTime = this.audioContext.currentTime + (index * duration);
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });
    }

    startTicking() {
        if (this.tickingInterval) return; // Already ticking
        
        // Play tick sound every second
        this.tickingInterval = setInterval(() => {
            this.playTickSound();
        }, 1000);
        
        // Play initial tick immediately
        this.playTickSound();
    }

    stopTicking() {
        if (this.tickingInterval) {
            clearInterval(this.tickingInterval);
            this.tickingInterval = null;
        }
    }

    showCelebration() {
        console.log('🎉 Celebration triggered!'); // Debug log
        
        // Play celebration sound
        this.playCelebrationSound();
        
        // Show fireworks
        this.createFireworks();
    }

    createFireworks() {
        console.log('🎆 Creating fireworks!'); // Debug log
        const container = document.querySelector('.game-container');
        
        if (!container) {
            console.log('Game container not found for fireworks');
            return;
        }
        
        // Create multiple firework bursts
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createFireworkBurst(container);
            }, i * 300);
        }
    }

    createFireworkBurst(container) {
        const fireworkContainer = document.createElement('div');
        fireworkContainer.className = 'firework-container';
        
        // Random position within the game area
        const rect = container.getBoundingClientRect();
        const x = Math.random() * (rect.width - 100) + 50;
        const y = Math.random() * (rect.height - 100) + 50;
        
        fireworkContainer.style.left = x + 'px';
        fireworkContainer.style.top = y + 'px';
        
        // Create particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            
            // Random colors
            const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random direction
            const angle = (i / 12) * 2 * Math.PI;
            const distance = 50 + Math.random() * 30;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            
            particle.style.setProperty('--dx', dx + 'px');
            particle.style.setProperty('--dy', dy + 'px');
            
            fireworkContainer.appendChild(particle);
        }
        
        container.appendChild(fireworkContainer);
        
        // Remove after animation
        setTimeout(() => {
            if (container.contains(fireworkContainer)) {
                container.removeChild(fireworkContainer);
            }
        }, 1500);
    }

    startGame() {
        if (!this.gameData) {
            alert('Game data not loaded yet. Please try again.');
            return;
        }
        
        // Resume audio context after user interaction (required by browsers)
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        this.gameActive = true;
        this.currentRound = 0;
        this.totalScore = 0;
        this.hintsUsed = 0;
        this.updateHintDisplay();
        this.showGameArea();
        this.startRound();
    }

    startRound() {
        this.roundActive = true;
        this.roundScore = 0;
        this.foundDifferences = [];
        this.hintFoundDifferences = [];
        this.hintsUsedThisRound = 0;
        this.baseRoundScore = 0;
        this.bonusPoints = 0;
        this.bonusType = '';
        
        const round = this.gameData.Game.Rounds[this.currentRound];
        this.currentTotalDifferences = round.coords.length;
        this.timeLeft = round.time || 60;
        
        // Load images
        this.elements.originalImage.src = `${round.image}_orig.jpg`;
        this.elements.modifiedImage.src = `${round.image}_mod.jpg`;
        
        // Update UI
        this.elements.currentRound.textContent = this.currentRound + 1;
        this.elements.foundCount.textContent = '0';
        this.elements.totalDifferences.textContent = this.currentTotalDifferences;
        this.updateTimer();
        
        // Clear overlays
        this.clearOverlays();
        
        // Ensure audio context is ready for next game
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        // Start timer
        this.startTimer();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            
            if (this.timeLeft <= 15 && this.timeLeft > 0) {
                if (!this.tickingInterval) {
                    this.startTicking();
                }
            }
            
            if (this.timeLeft <= 10) {
                this.elements.timer.parentElement.classList.add('timer-urgent');
            }
            
            if (this.timeLeft <= 0) {
                this.endRound();
            }
        }, 1000);
    }

    updateTimer() {
        this.elements.timer.textContent = this.timeLeft;
    }

    getCurrentPointValue() {
        return Math.max(1, this.timeLeft);
    }

    getScaledCoordinates(coord, imageType) {
        // Coordinates in JSON are based on _mod file dimensions
        // Scale them appropriately for each image type
        
        if (imageType === 'modified') {
            // For modified image, use coordinates as-is (they're based on this image)
            return coord;
        } else {
            // For original image, scale coordinates based on dimension differences
            const origImg = this.elements.originalImage;
            const modImg = this.elements.modifiedImage;
            
            if (!origImg.naturalWidth || !modImg.naturalWidth) {
                // Images not fully loaded yet, use original coordinates
                return coord;
            }
            
            // Calculate scaling factors
            const scaleX = origImg.naturalWidth / modImg.naturalWidth;
            const scaleY = origImg.naturalHeight / modImg.naturalHeight;
            
            return {
                x: coord.x * scaleX,
                y: coord.y * scaleY,
                radius: coord.radius * Math.min(scaleX, scaleY) // Use smaller scale for radius
            };
        }
    }

    setupImageOverlay(imageType) {
        const img = this.elements[`${imageType}Image`];
        const overlay = this.elements[`${imageType}Overlay`];
        
        // Set overlay dimensions to match image (no manual positioning needed)
        overlay.style.width = img.offsetWidth + 'px';
        overlay.style.height = img.offsetHeight + 'px';
        
        // Set SVG viewBox to match image dimensions
        overlay.setAttribute('viewBox', `0 0 ${img.naturalWidth} ${img.naturalHeight}`);
    }

        handleImageClick(event, imageType) {
        if (!this.roundActive) return;
        
        const img = event.target;
        const modImg = this.elements.modifiedImage;
        
        // Get click position relative to the image
        const imgRect = img.getBoundingClientRect();
        const clickX = event.clientX - imgRect.left;
        const clickY = event.clientY - imgRect.top;
        
        // Convert click to modified image coordinate system (accounting for letterboxing)
        
        // Convert click to modified image coordinate system (since JSON coords are based on modified image)
        // This ensures consistent coordinate space regardless of which image is clicked
        let modClickX, modClickY;
        
        if (imageType === 'modified') {
            // Account for letterboxing due to object-fit: contain
            const imgNaturalRatio = modImg.naturalWidth / modImg.naturalHeight;
            const imgDisplayRatio = img.offsetWidth / img.offsetHeight;
            
            let actualClickX = clickX;
            let actualClickY = clickY;
            let actualWidth = img.offsetWidth;
            let actualHeight = img.offsetHeight;
            
            if (imgDisplayRatio > imgNaturalRatio) {
                // Image is letterboxed horizontally (white margins on left/right)
                actualWidth = img.offsetHeight * imgNaturalRatio;
                const marginX = (img.offsetWidth - actualWidth) / 2;
                actualClickX = clickX - marginX;
            } else if (imgDisplayRatio < imgNaturalRatio) {
                // Image is letterboxed vertically (white margins on top/bottom)
                actualHeight = img.offsetWidth / imgNaturalRatio;
                const marginY = (img.offsetHeight - actualHeight) / 2;
                actualClickY = clickY - marginY;
            }
            
            // Now scale using actual content dimensions
            const scaleX = modImg.naturalWidth / actualWidth;
            const scaleY = modImg.naturalHeight / actualHeight;
            
            modClickX = actualClickX * scaleX;
            modClickY = actualClickY * scaleY;
        } else {
            // For original image, also account for letterboxing
            const origNaturalRatio = img.naturalWidth / img.naturalHeight;
            const origDisplayRatio = img.offsetWidth / img.offsetHeight;
            
            let actualClickX = clickX;
            let actualClickY = clickY;
            let actualWidth = img.offsetWidth;
            let actualHeight = img.offsetHeight;
            
            if (origDisplayRatio > origNaturalRatio) {
                // Image is letterboxed horizontally
                actualWidth = img.offsetHeight * origNaturalRatio;
                const marginX = (img.offsetWidth - actualWidth) / 2;
                actualClickX = clickX - marginX;
            } else if (origDisplayRatio < origNaturalRatio) {
                // Image is letterboxed vertically
                actualHeight = img.offsetWidth / origNaturalRatio;
                const marginY = (img.offsetHeight - actualHeight) / 2;
                actualClickY = clickY - marginY;
            }
            
            // Convert to original natural coordinates
            const origScaleX = img.naturalWidth / actualWidth;
            const origScaleY = img.naturalHeight / actualHeight;
            const origNaturalX = actualClickX * origScaleX;
            const origNaturalY = actualClickY * origScaleY;
            
            // Convert to modified coordinate system
            const origToModScaleX = modImg.naturalWidth / img.naturalWidth;
            const origToModScaleY = modImg.naturalHeight / img.naturalHeight;
            
            modClickX = origNaturalX * origToModScaleX;
            modClickY = origNaturalY * origToModScaleY;
        }
        
        // Check if click is within any difference area
        const round = this.gameData.Game.Rounds[this.currentRound];
        let foundHit = false;
        
        for (let i = 0; i < round.coords.length; i++) {
            const coord = round.coords[i];
            
            if (this.foundDifferences.includes(i)) continue;
            
            // Compare in modified image coordinate system
            const distance = Math.sqrt(
                Math.pow(modClickX - coord.x, 2) + Math.pow(modClickY - coord.y, 2)
            );
            
            if (distance <= coord.radius) {
                this.foundDifference(i, coord);
                foundHit = true;
                break;
            }
        }
         
         // If no hit was found, apply penalty
         if (!foundHit) {
             this.applyMissPenalty();
         }
    }

    foundDifference(index, coord) {
        this.foundDifferences.push(index);
        
        // Add points
        const points = this.getCurrentPointValue();
        this.roundScore += points;
        this.totalScore += points;
        
        // Update UI
        this.elements.foundCount.textContent = this.foundDifferences.length;
        this.elements.totalScore.textContent = this.totalScore;
        
        // Add visual feedback to both images
        this.addDifferenceCircle('original', coord, 'difference-circle');
        this.addDifferenceCircle('modified', coord, 'difference-circle');
        
        // Check if all differences found
        if (this.foundDifferences.length >= this.currentTotalDifferences) {
            this.showCelebration();
            this.endRound();
        }
    }

    addDifferenceCircle(imageType, coord, className) {
        const overlay = this.elements[`${imageType}Overlay`];
        
        // Scale coordinates for the appropriate image
        const scaledCoord = this.getScaledCoordinates(coord, imageType);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', scaledCoord.x);
        circle.setAttribute('cy', scaledCoord.y);
        circle.setAttribute('r', scaledCoord.radius);
        circle.setAttribute('class', className);
        
        overlay.appendChild(circle);
    }

    applyMissPenalty() {
        // Subtract 10 seconds from timer
        this.timeLeft = Math.max(0, this.timeLeft - 10);
        this.updateTimer();
        
        // Add visual feedback for the penalty
        this.showPenaltyFeedback();
        
        // Start ticking if we've crossed the 15-second threshold
        if (this.timeLeft <= 15 && this.timeLeft > 0) {
            if (!this.tickingInterval) {
                this.startTicking();
            }
        }
        
        // Check if time ran out due to penalty
        if (this.timeLeft <= 0) {
            this.endRound();
        }
    }

    showPenaltyFeedback() {
        // Flash the timer red to indicate penalty
        const timerElement = this.elements.timer.parentElement;
        timerElement.style.background = 'rgba(255, 0, 0, 0.8)';
        timerElement.style.transition = 'background 0.3s ease';
        
        // Reset after a short delay
        setTimeout(() => {
            timerElement.style.background = '';
        }, 500);
    }

    useHint() {
        if (!this.roundActive || this.hintsUsed >= this.maxHints) return;
        
        // Find remaining differences
        const round = this.gameData.Game.Rounds[this.currentRound];
        const remainingDifferences = [];
        
        for (let i = 0; i < round.coords.length; i++) {
            if (!this.foundDifferences.includes(i)) {
                remainingDifferences.push(i);
            }
        }
        
        // If no differences left, don't use hint
        if (remainingDifferences.length === 0) return;
        
        // Use the hint
        this.hintsUsed++;
        this.hintsUsedThisRound++;
        this.updateHintDisplay();
        
        // Randomly select a difference to reveal
        const randomIndex = remainingDifferences[Math.floor(Math.random() * remainingDifferences.length)];
        const coord = round.coords[randomIndex];
        
        // Mark as found and give normal time-based points
        this.foundDifferences.push(randomIndex);
        this.hintFoundDifferences.push(randomIndex);
        
        // Add points based on current time (same as manual finds)
        const points = this.getCurrentPointValue();
        this.roundScore += points;
        this.totalScore += points;
        
        console.log(`💡 Used hint for difference ${randomIndex + 1}! Found: ${this.foundDifferences.length}/${this.currentTotalDifferences}, Points: +${points}`);
        
        // Update UI
        this.elements.foundCount.textContent = this.foundDifferences.length;
        this.elements.totalScore.textContent = this.totalScore;
        
        // Add visual feedback to both images (yellow for hints)
        this.addDifferenceCircle('original', coord, 'hint-circle');
        this.addDifferenceCircle('modified', coord, 'hint-circle');
        
        // Check if all differences found
        if (this.foundDifferences.length >= this.currentTotalDifferences) {
            console.log(`🏆 All differences found via hint! Triggering celebration...`);
            this.showCelebration();
            this.endRound();
        }
    }

    updateHintDisplay() {
        const hintElements = [this.elements.hint1, this.elements.hint2, this.elements.hint3];
        
        hintElements.forEach((element, index) => {
            if (index < this.hintsUsed) {
                element.classList.add('used');
                element.title = 'Hint Used';
            } else {
                element.classList.remove('used');
                element.title = 'Use Hint (earns current time points)';
            }
        });
    }

    applyRoundBonus() {
        const timeRanOut = this.timeLeft <= 0;
        const foundAll = this.foundDifferences.length >= this.currentTotalDifferences;
        
        // Store base score before any bonuses/penalties
        this.baseRoundScore = this.roundScore;
        this.bonusPoints = 0;
        this.bonusType = '';
        
        // Add hints remaining bonus (50 points per unused hint)
        const hintsRemaining = this.maxHints - this.hintsUsedThisRound;
        if (hintsRemaining > 0) {
            this.bonusPoints = hintsRemaining * 50;
            this.roundScore += this.bonusPoints;
            this.totalScore += this.bonusPoints;
            this.bonusType = 'hints';
            console.log(`💡 Hints remaining bonus: ${hintsRemaining} hints × 50 = +${this.bonusPoints} points`);
        }
        
        // Apply incomplete penalty if time ran out
        if (!foundAll && timeRanOut) {
            const penaltyPoints = Math.round(this.baseRoundScore * 0.2);
            this.roundScore = Math.max(0, this.roundScore - penaltyPoints);
            this.totalScore = Math.max(0, this.totalScore - penaltyPoints);
            
            if (this.bonusType === 'hints') {
                // Show both hints bonus and penalty
                this.bonusType = 'hints_penalty';
                this.penaltyPoints = penaltyPoints;
            } else {
                this.bonusType = 'penalty';
                this.bonusPoints = penaltyPoints;
            }
            console.log(`⏰ Incomplete penalty applied: -${penaltyPoints} points`);
        }
        
        // Update UI with final scores
        this.elements.totalScore.textContent = this.totalScore;
    }

    // Bonus display removed - hints remaining shown only in final results

    endRound() {
        this.roundActive = false;
        clearInterval(this.timerInterval);
        this.stopTicking();
        
        this.elements.timer.parentElement.classList.remove('timer-urgent');
        
        // Apply bonuses/penalties
        this.applyRoundBonus();
        
        // Show answer key for unfound differences
        const round = this.gameData.Game.Rounds[this.currentRound];
        round.coords.forEach((coord, index) => {
            if (!this.foundDifferences.includes(index)) {
                this.addDifferenceCircle('original', coord, 'answer-circle');
                this.addDifferenceCircle('modified', coord, 'answer-circle');
            }
        });
        
        // Show round results
        this.showRoundResults();
    }

    showRoundResults() {
        const foundCount = this.foundDifferences.length;
        
        this.elements.finalFoundCount.textContent = foundCount;
        this.elements.finalTotalDifferences.textContent = this.currentTotalDifferences;
        
        // Show score breakdown
        this.elements.baseRoundScore.textContent = this.baseRoundScore || this.roundScore;
        this.elements.roundScore.textContent = this.roundScore;
        this.elements.roundTotalScore.textContent = this.totalScore;
        
        // Show bonus/penalty line if applicable
        if (this.bonusType === 'hints') {
            const hintsRemaining = this.maxHints - this.hintsUsedThisRound;
            this.elements.bonusLine.textContent = `Hints Remaining: ${hintsRemaining} × 50 = +${this.bonusPoints} points`;
            this.elements.bonusLine.style.color = '#4CAF50';
            this.elements.bonusLine.style.fontWeight = 'bold';
            this.elements.bonusLine.style.display = 'block';
        } else if (this.bonusType === 'hints_penalty') {
            const hintsRemaining = this.maxHints - this.hintsUsedThisRound;
            this.elements.bonusLine.innerHTML = `Hints Remaining: ${hintsRemaining} × 50 = +${this.bonusPoints} points<br><span style="color: #e74c3c;">Incomplete Penalty: -${this.penaltyPoints} points</span>`;
            this.elements.bonusLine.style.color = '#4CAF50';
            this.elements.bonusLine.style.fontWeight = 'bold';
            this.elements.bonusLine.style.display = 'block';
        } else if (this.bonusType === 'penalty') {
            this.elements.bonusLine.textContent = `Incomplete Penalty: -${this.bonusPoints} points`;
            this.elements.bonusLine.style.color = '#e74c3c';
            this.elements.bonusLine.style.fontWeight = 'bold';
            this.elements.bonusLine.style.display = 'block';
        } else {
            this.elements.bonusLine.style.display = 'none';
        }
        
        const completionRate = foundCount / this.currentTotalDifferences;
        
        if (completionRate === 1) {
            this.elements.roundResultTitle.textContent = 'Perfect Round!';
        } else if (completionRate >= 0.8) {
            this.elements.roundResultTitle.textContent = 'Great Job!';
        } else if (completionRate >= 0.5) {
            this.elements.roundResultTitle.textContent = 'Good Try!';
        } else {
            this.elements.roundResultTitle.textContent = 'Keep Practicing!';
        }
        
        this.elements.gameArea.style.display = 'none';
        this.elements.roundComplete.style.display = 'block';
        
        // Update button text for last round
        if (this.currentRound >= this.gameData.Game.Rounds.length - 1) {
            this.elements.nextRoundButton.textContent = 'View Final Score';
        }
    }

    nextRound() {
        this.elements.roundComplete.style.display = 'none';
        
        this.currentRound++;
        
        if (this.currentRound >= this.gameData.Game.Rounds.length) {
            this.showGameComplete();
        } else {
            this.elements.gameArea.style.display = 'block';
            this.startRound();
        }
    }

    showGameComplete() {
        this.gameActive = false;
        this.elements.finalScore.textContent = this.totalScore;
        this.elements.gameComplete.style.display = 'block';
    }

    showGameArea() {
        this.elements.gameStatus.style.display = 'none';
        this.elements.roundComplete.style.display = 'none';
        this.elements.gameComplete.style.display = 'none';
        this.elements.answerKeyView.style.display = 'none';
        this.elements.gameArea.style.display = 'block';
    }

    showAnswerKey() {
        const round = this.gameData.Game.Rounds[this.currentRound];
        
        // Set up answer key images
        this.elements.answerOriginalImage.src = `${round.image}_orig.jpg`;
        this.elements.answerModifiedImage.src = `${round.image}_mod.jpg`;
        this.elements.answerKeyRound.textContent = this.currentRound + 1;
        
        // Hide round complete, show answer key
        this.elements.roundComplete.style.display = 'none';
        this.elements.answerKeyView.style.display = 'block';
        
        // Clear and populate answer key overlays
        this.clearAnswerKeyOverlays();
        
        // Track when both images have loaded
        let originalLoaded = false;
        let modifiedLoaded = false;
        
        const checkBothLoaded = () => {
            if (originalLoaded && modifiedLoaded) {
                this.populateAnswerKey();
            }
        };
        
        // Set up overlays when images load
        this.elements.answerOriginalImage.onload = () => {
            this.setupAnswerKeyOverlay('original');
            originalLoaded = true;
            checkBothLoaded();
        };
        this.elements.answerModifiedImage.onload = () => {
            this.setupAnswerKeyOverlay('modified');
            modifiedLoaded = true;
            checkBothLoaded();
        };
        
        // Reset circles visibility to visible
        this.circlesVisible = true;
        this.elements.toggleCirclesButton.textContent = 'Hide Circles';
        
        // Ensure overlays are actually visible
        this.elements.answerOriginalOverlay.style.display = 'block';
        this.elements.answerModifiedOverlay.style.display = 'block';
        
        // Reset any zoomed images
        this.elements.answerOriginalImage.classList.remove('zoomed');
        this.elements.answerModifiedImage.classList.remove('zoomed');
        this.elements.answerOriginalImage.parentElement.classList.remove('zoomed');
        this.elements.answerModifiedImage.parentElement.classList.remove('zoomed');

    }

    hideAnswerKey() {
        this.elements.answerKeyView.style.display = 'none';
        this.elements.roundComplete.style.display = 'block';
    }

    toggleCircles() {
        this.circlesVisible = !this.circlesVisible;
        
        // Toggle visibility of both answer key overlays
        const originalOverlay = this.elements.answerOriginalOverlay;
        const modifiedOverlay = this.elements.answerModifiedOverlay;
        
        if (this.circlesVisible) {
            originalOverlay.style.display = 'block';
            modifiedOverlay.style.display = 'block';
            this.elements.toggleCirclesButton.textContent = 'Hide Circles';
        } else {
            originalOverlay.style.display = 'none';
            modifiedOverlay.style.display = 'none';
            this.elements.toggleCirclesButton.textContent = 'Show Circles';
        }
    }

    toggleImageZoom(event) {
        const image = event.target;
        const imageHolder = image.parentElement;
        
        // Toggle zoom classes
        image.classList.toggle('zoomed');
        imageHolder.classList.toggle('zoomed');
        
        // If zooming in, clear any other zoomed images
        if (image.classList.contains('zoomed')) {
            // Find the other answer key image and unzoom it
            const otherImage = image === this.elements.answerOriginalImage ? 
                this.elements.answerModifiedImage : this.elements.answerOriginalImage;
            const otherHolder = otherImage.parentElement;
            
            otherImage.classList.remove('zoomed');
            otherHolder.classList.remove('zoomed');
        }
    }

    setupAnswerKeyOverlay(imageType) {
        const img = this.elements[`answer${imageType.charAt(0).toUpperCase() + imageType.slice(1)}Image`];
        const overlay = this.elements[`answer${imageType.charAt(0).toUpperCase() + imageType.slice(1)}Overlay`];
        
        // Set overlay dimensions to match image
        overlay.style.width = img.offsetWidth + 'px';
        overlay.style.height = img.offsetHeight + 'px';
        
        // Set SVG viewBox to match the specific image dimensions
        overlay.setAttribute('viewBox', `0 0 ${img.naturalWidth} ${img.naturalHeight}`);
    }

    clearAnswerKeyOverlays() {
        this.elements.answerOriginalOverlay.innerHTML = '';
        this.elements.answerModifiedOverlay.innerHTML = '';
    }

    populateAnswerKey() {
        const round = this.gameData.Game.Rounds[this.currentRound];
        
        round.coords.forEach((coord, index) => {
            let className;
            
            if (this.hintFoundDifferences.includes(index)) {
                className = 'hint-circle';
            } else if (this.foundDifferences.includes(index)) {
                className = 'difference-circle';
            } else {
                className = 'answer-circle';
            }
            
            // Add circles to both images
            this.addAnswerKeyCircle('original', coord, className);
            this.addAnswerKeyCircle('modified', coord, className);
        });
    }

    getAnswerKeyScaledCoordinates(coord, imageType) {
        if (imageType === 'modified') {
            return coord;
        } else {
            const origImg = this.elements.answerOriginalImage;
            const modImg = this.elements.answerModifiedImage;
            
            if (!origImg.naturalWidth || !modImg.naturalWidth) {
                return coord;
            }
            
            // Convert from modified image coordinate space to original image coordinate space
            const scaleX = origImg.naturalWidth / modImg.naturalWidth;
            const scaleY = origImg.naturalHeight / modImg.naturalHeight;
            
            return {
                x: coord.x * scaleX,
                y: coord.y * scaleY,
                radius: coord.radius * Math.min(scaleX, scaleY)
            };
        }
    }

    addAnswerKeyCircle(imageType, coord, className) {
        const overlay = this.elements[`answer${imageType.charAt(0).toUpperCase() + imageType.slice(1)}Overlay`];
        
        // Scale coordinates for answer key images too
        const scaledCoord = this.getAnswerKeyScaledCoordinates(coord, imageType);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', scaledCoord.x);
        circle.setAttribute('cy', scaledCoord.y);
        circle.setAttribute('r', scaledCoord.radius);
        circle.setAttribute('class', className);
        
        overlay.appendChild(circle);
    }

    clearOverlays() {
        this.elements.originalOverlay.innerHTML = '';
        this.elements.modifiedOverlay.innerHTML = '';
    }



    resetGame() {
        // Stop any active timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        // Stop any ticking sound
        this.stopTicking();
        
        // Reset all game state
        this.gameActive = false;
        this.roundActive = false;
        this.currentRound = 0;
        this.totalScore = 0;
        this.roundScore = 0;
        this.foundDifferences = [];
        this.hintFoundDifferences = [];
        this.currentTotalDifferences = 0;
        this.hintsUsed = 0;
        this.hintsUsedThisRound = 0;
        this.timeLeft = 60;
        this.baseRoundScore = 0;
        this.bonusPoints = 0;
        this.bonusType = '';
        this.circlesVisible = true;
        
        // Reset UI
        this.elements.totalScore.textContent = '0';
        this.elements.currentRound.textContent = '1';
        this.elements.timer.textContent = '60';
        this.elements.foundCount.textContent = '0';
        this.elements.totalDifferences.textContent = '0';
        this.elements.timer.parentElement.classList.remove('timer-urgent');
        this.elements.nextRoundButton.textContent = 'Next Round';
        
        // Reset hints
        this.updateHintDisplay();
        
        // Clear overlays
        this.clearOverlays();
        
        // Show start screen
        this.elements.gameArea.style.display = 'none';
        this.elements.roundComplete.style.display = 'none';
        this.elements.gameComplete.style.display = 'none';
        this.elements.answerKeyView.style.display = 'none';
        this.elements.gameStatus.style.display = 'block';
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PhotoHuntGame();
}); 