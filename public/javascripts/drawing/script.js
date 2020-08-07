$(function() {

    const canvas = $('#canvas');
    canvas.center();

    function a(id) {
        const duration = 10;
        let shape = $('#' + id + '-path');
        shape.invisible();
        let path = MotionPathPlugin.convertToPath(shape);
        let elements = $('.' + id);
        $(elements).each(function (index) {
            let position = index / elements.length;
            let timeline = gsap.timeline();

            timeline.to(this, {
                    duration: duration * (1 - position),
                    immediateRender: true,
                    ease: Power0.easeNone,
                    motionPath: {alignOrigin:0,
                        align: path,
                        path: path[0],
                        autoRotate: false,
                        start: position
                    }
                }
            ).to(this, {
                duration: position * duration,
                immediateRender: true,
                ease: Power0.easeNone,
                motionPath: {alignOrigin:0,
                    align: path,
                    path: path[0],
                    autoRotate: false,
                    end: position
                }
            }).repeat(-1);

        })
    }

    a('infused');
    //a('cardinal');

// a('gifts');

})