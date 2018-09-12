function QueueGroupTransitionTween() {

	this.animationTime = 2000;

}

QueueGroupTransitionTween.prototype = {

	openLayer: function(layer) {

		let init = {
			ratio: 0
		};
		let end = {
			ratio: 1
		};

		let openTween = new TWEEN.Tween(init)
			.to(end, this.animationTime);

		openTween.onUpdate(function () {

			for (let i = 0; i < layer.queueHandlers.length; i++) {

				let tempPos = {
					x: init.ratio * (layer.openCenterList[i].x - layer.closeCenterList[i].x),
					y: init.ratio * (layer.openCenterList[i].y - layer.closeCenterList[i].y),
					z: init.ratio * (layer.openCenterList[i].z - layer.closeCenterList[i].z)
				};

				layer.queueHandlers[i].updatePos(tempPos);

			}

		}).onStart(function () {
			console.log("start open layer");
			layer.disposeAggregationElement();
			layer.initSegregationElements(layer.closeCenterList);
		}).onComplete(function() {
			console.log("end open layer");
			layer.initCloseButton();
			layer.isOpen = true;

		});

		openTween.start();

	},

	closeLayer: function(layer) {

		let init = {
			ratio: 1
		};
		let end = {
			ratio: 0
		};

		let fmTween = new TWEEN.Tween(init)
			.to(end, 2000);

		fmTween.onUpdate(function () {

			for (let i = 0; i < layer.queueHandlers.length; i++) {

				let tempPos = {
					x: init.ratio * (layer.openCenterList[i].x - layer.closeCenterList[i].x),
					y: init.ratio * (layer.openCenterList[i].y - layer.closeCenterList[i].y),
					z: init.ratio * (layer.openCenterList[i].z - layer.closeCenterList[i].z)
				};

				layer.queueHandlers[i].updatePos(tempPos);

			}

		}).onStart(function () {
			console.log("start close layer");
			layer.disposeCloseButton();
		}).onComplete(function() {
			console.log("end close layer");
			layer.disposeSegregationElements();
			layer.initAggregationElement();
			layer.isOpen = false;
		});

		fmTween.start();

	}

};

let QueueGroupTweenFactory = new QueueGroupTransitionTween();

export { QueueGroupTweenFactory };