$(function () {

    const canvas = $('#canvas');
    canvas.center();

    function a(id, direction, duration) {
        let shape = $('#' + id + '-path');
        let path = MotionPathPlugin.convertToPath(shape);
        let elements = $('.' + id);
        $(elements).each(function (index) {
            let position = index / elements.length;
            let timeline = gsap.timeline();

            timeline.to(this, {
                    duration: duration * (1 - position),
                    immediateRender: true,
                    ease: Power0.easeNone,
                    motionPath: {
                        align: path,
                        path: path[0],
                        autoRotate: true,
                        start: position,
                        alignOrigin: [0.5, 0.5]
                    }
                }
            ).to(this, {
                duration: position * duration,
                immediateRender: true,
                ease: Power0.easeNone,
                motionPath: {
                    align: path,
                    path: path[0],
                    autoRotate: true,
                    end: position,
                    alignOrigin: [0.5, 0.5]
                }
            }).repeat(-1);
        })
    }

    a('infused', 1, 10);
    a('cardinal', 1, 20);
    a('gift', 1, 30);
    a('fruit', 1, 40);
    a('vice', -1, 50);

})