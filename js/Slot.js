const numberOfReal = 3;
const numberOfImage = 5;

class SlotModel {
    imageId = [];

    constructor() {
        for (let i = 0; i < numberOfReal; i++) {
            this.imageId[i] = i;
        }
    }

    getImageIdFor(realId) {
        return this.imageId[realId];
    }

    next(realId) {
        const currentId = this.getImageIdFor(realId);
        this.imageId[realId] = (currentId + 1) % numberOfImage;
    }
}

class SlotPresenter {
    view;
    model;
    intervalIds = []; // 0, 1, 2 -> left, center, right

    constructor(view) {
        this.view = view;
        this.model = new SlotModel();
    }

    onStart() {
        for (let i = 0; i < numberOfReal; i++) {
            this.intervalIds[i] = setInterval((realId) => {
                this.model.next(realId);
                const imageId = this.model.getImageIdFor(realId);
                this.view.update(realId, imageId);
            }, 100, i);
        }
    }

    onStop(realId) {
        clearInterval(this.intervalIds[realId]);
        const imageId = this.model.getImageIdFor(realId);
        this.view.update(realId, imageId);
    }
}

class SlotView {
    startButton;
    stopButtons = []; // 0, 1, 2 -> left, center, right
    images = []; // 0, 1, 2 -> left, center, right
    presenter;

    constructor() {
        this.startButton = document.getElementById('start_button');

        for (let i = 0; i < numberOfReal; i++) {
            this.stopButtons[i] = document.getElementById(`stop_button_${i}`);;
            this.images[i] = document.getElementById(`image_${i}`);
        }

        this.presenter = new SlotPresenter(this);
    }

    onStart() {
        this.startButton.disabled = true;
        this.stopButtons.forEach((button) => button.disabled = false);
        this.presenter.onStart();
    }

    onStop(realId) {
        this.stopButtons[realId].disabled = true;
        this.presenter.onStop(realId);
    }

    update(realId, imageId) {
        this.images[realId].src = `images/slot${imageId}.jpg`;
        const disableButtons = this.stopButtons.filter((button) => button.disabled);
        this.startButton.disabled = (disableButtons.length != 3);
    }
}

slotView = new SlotView();
