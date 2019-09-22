const numberOfReal = 3;
const numberOfImage = 5;

class SlotView {
    startButton;
    stopButtons = []; // 0, 1, 2 -> left, center, right
    images = []; // 0, 1, 2 -> left, center, right
    intervalIds = []; // 0, 1, 2 -> left, center, right
    imageId = [];

    constructor() {
        this.startButton = document.getElementById('start_button');

        for (let i = 0; i < numberOfReal; i++) {
            this.stopButtons[i] = document.getElementById(`stop_button_${i}`);;
            this.images[i] = document.getElementById(`image_${i}`);
            this.imageId[i] = i;
        }
    }

    onStart() {
        this.startButton.disabled = true;
        this.stopButtons.forEach((button) => button.disabled = false);

        for (let i = 0; i < numberOfReal; i++) {
            this.intervalIds[i] = setInterval((realId) => {
                const currentId = this.imageId[realId];
                const imageId = (currentId + 1) % numberOfImage;

                this.imageId[realId] = imageId;
                this.update(realId, imageId);
            }, 100, i);
        }
    }

    onStop(realId) {
        this.stopButtons[realId].disabled = true;
        clearInterval(this.intervalIds[realId]);

        const imageId = this.imageId[realId];
        this.update(realId, imageId);
    }

    update(realId, imageId) {
        this.images[realId].src = `images/slot${imageId}.jpg`;
        const disableButtons = this.stopButtons.filter((button) => button.disabled);
        this.startButton.disabled = (disableButtons.length != 3);
    }
}

slotView = new SlotView();
