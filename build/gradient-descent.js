"use strict";
//h(x) = theta0 + theta1*x;
var GradientDescent = /** @class */ (function () {
    function GradientDescent(sampleSize, learningRate) {
        if (sampleSize === void 0) { sampleSize = 30; }
        if (learningRate === void 0) { learningRate = 0.01; }
        this.sampleSize = 30;
        this.learningRate = 0.01;
        this.maxIteration = 1000;
        this.trainingData = [];
        this.isConverged = false;
        this.theta0 = 0;
        this.theta1 = 0;
        this.threshold = 0.0001;
        this.sampleSize = sampleSize;
        this.learningRate = learningRate;
        this.init();
    }
    GradientDescent.prototype.init = function () {
        this.prepareTrainingData();
    };
    GradientDescent.prototype.start = function () {
        var iteration = 1;
        while (!this.isConverged && iteration < this.maxIteration) {
            console.log('\niteration:' + iteration);
            this.iterate();
            iteration++;
        }
        // var interval = setInterval(() => {
        //     if (!this.isConverged && iteration < this.maxIteration) {
        //         console.log('\niteration:' + iteration);
        //     } else {
        //         clearInterval(interval);
        //     }
        // }, 100);
    };
    GradientDescent.prototype.iterate = function () {
        var mse_before = this.J();
        var temp0 = this.theta0 - (this.learningRate * this.derivativeTheta0());
        var temp1 = this.theta1 - (this.learningRate * this.derivativeTheta1());
        this.theta0 = temp0;
        this.theta1 = temp1;
        console.log("theta0:" + this.theta0);
        console.log("theta1:" + this.theta1);
        this.isConverged = (mse_before - this.J() < this.threshold);
    };
    GradientDescent.prototype.J = function () {
        var _this = this;
        var sum = 0;
        this.trainingData.forEach(function (point) {
            sum += _this.squaredError(point);
        });
        return sum / (2 * this.trainingData.length);
    };
    GradientDescent.prototype.squaredError = function (point) {
        return Math.pow(this.predictionError(point), 2);
    };
    GradientDescent.prototype.predictionError = function (point) {
        return this.h(point.x) - point.y;
    };
    //hypothesis
    GradientDescent.prototype.h = function (x) {
        return this.theta1 * x + this.theta0;
    };
    GradientDescent.prototype.derivativeTheta0 = function () {
        var _this = this;
        var sum = 0;
        this.trainingData.forEach(function (point) {
            sum += _this.predictionError(point);
        });
        return sum / this.trainingData.length;
    };
    GradientDescent.prototype.derivativeTheta1 = function () {
        var _this = this;
        var sum = 0;
        this.trainingData.forEach(function (point) {
            sum += _this.predictionError(point) * point.x;
        });
        return sum / this.trainingData.length;
    };
    GradientDescent.prototype.prepareTrainingData = function () {
        for (var i = 0; i < this.sampleSize; i++) {
            var point = this.getRandomPoint(10);
            this.trainingData.push(point);
        }
    };
    GradientDescent.prototype.getRandomPoint = function (max) {
        var slope = 0.5;
        var intercept = 2.5;
        var stddev = 0.9;
        var x = Math.round(Math.random() * max);
        var y = slope * x + intercept + Math.random() * stddev;
        console.log('data points');
        console.log(x + " " + y);
        return {
            x: x,
            y: y
        };
    };
    return GradientDescent;
}());
new GradientDescent().start();
