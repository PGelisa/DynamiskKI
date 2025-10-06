class WeatherApp {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 6;
        this.modalData = {
            bakkestasjoner: `<h4>Bakkestasjoner</h4>
                <p>Automatiske værstasjoner måler temperatur, luftfuktighet, vindstyrke, lufttrykk, og nedbør. Over 300 stasjoner i Norge.</p>`,
            radiosonder: `<h4>Værballonger / Radiosonder</h4>
                <p>Bæres opp i atmosfæren og måler temperatur, fuktighet og vind opp til 30-35 km høyde, to ganger daglig.</p>`,
            radar: `<h4>Værradar</h4>
                <p>Detekterer nedbør, vindshear og turbulens via radarstråler med oppdatering hvert 5-15 minutt.</p>`,
            satellitter: `<h4>Satellitter</h4>
                <p>Polære og geostasjonære satellitter gir global overvåkning av atmosfæren og skydekke, med mange instrumenttyper.</p>`
        };
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.updateUI();
    }

    cacheElements() {
        this.steps = document.querySelectorAll('.step-content');
        this.navSteps = document.querySelectorAll('.nav-step');
        this.progressBar = document.getElementById('progressBar');
        this.modal = document.getElementById('infoModal');
        this.modalBody = document.getElementById('modalBody');
        this.nextBtn = document.getElementById('nextBtn');
        this.prevBtn = document.getElementById('prevBtn');
    }

    bindEvents() {
        this.nextBtn.addEventListener('click', e => {
            e.preventDefault();
            if (this.currentStep === this.totalSteps) {
                this.goToStep(1);
            } else {
                this.nextStep();
            }
        });

        this.prevBtn.addEventListener('click', e => {
            e.preventDefault();
            if (this.currentStep === 1) {
                this.goToStep(this.totalSteps);
            } else {
                this.prevStep();
            }
        });

        this.navSteps.forEach(navStep => {
            navStep.addEventListener('click', e => {
                const step = parseInt(navStep.getAttribute('data-step'));
                this.goToStep(step);
            });
        });

        this.modal.querySelector('#closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        this.modal.addEventListener('click', e => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        document.addEventListener('click', e => {
            let el = e.target;
            while (el && el !== document) {
                if (el.classList && el.classList.contains('clickable')) {
                    const infoType = el.getAttribute('data-info');
                    if (infoType && this.modalData[infoType]) {
                        this.showModal(infoType);
                        return;
                    }
                }
                el = el.parentNode;
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextStep();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevStep();
            } else if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    updateUI() {
        this.steps.forEach((step, i) => {
            step.classList.toggle('active', i === this.currentStep - 1);
        });

        this.navSteps.forEach((navStep, i) => {
            navStep.classList.toggle('active', i === this.currentStep - 1);
        });

        const progressPct = (this.currentStep / this.totalSteps) * 100;
        this.progressBar.style.width = `${progressPct}%`;
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateUI();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }

    goToStep(step) {
        if (step >= 1 && step <= this.totalSteps) {
            this.currentStep = step;
            this.updateUI();
        }
    }

    showModal(infoType) {
        this.modalBody.innerHTML = this.modalData[infoType];
        this.modal.style.display = 'flex';
        this.modal.focus();
    }

    closeModal() {
        this.modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
