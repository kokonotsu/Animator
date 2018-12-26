class GesturePanel extends egret.DisplayObjectContainer {

	private _mousePoints: ur.Point[];
	private _currentPoint: ur.Point;
	private _layer: egret.Sprite;
	private gestureUtil: ur.UnistrokeRecognize = ur.UnistrokeRecognize.create();
	private startTime: number;

	private _mouseEffectPoints: Array<Array<number>> = [];
	private particleStarsTexture = RES.getRes("GT_stars_png");
	private particleStarsConfig = RES.getRes("GT_stars_json");

	private touchMask: egret.DisplayObject = new egret.DisplayObject();

	public constructor() {
		super();
		this.touchMask.$hitTest = function () {
			return this;
		}
		this.touchMask.touchEnabled = true;
	}

	init(): void {
		this._layer = new egret.Sprite();
		this._layer.$hitTest = () => {
			return null;
		};
		this._layer.width = 640;
		this._layer.height = 1136;
		this._layer.x = 0;
		this._layer.y = 0;
		this.addChild(this._layer);
		this.gestureUtil.addGesture("triangle",
			new Array(new ur.Point(137, 139), new ur.Point(135, 141), new ur.Point(133, 144), new ur.Point(132, 146), new ur.Point(130, 149), new ur.Point(128, 151), new ur.Point(126, 155), new ur.Point(123, 160), new ur.Point(120, 166), new ur.Point(116, 171), new ur.Point(112, 177), new ur.Point(107, 183), new ur.Point(102, 188), new ur.Point(100, 191), new ur.Point(95, 195), new ur.Point(90, 199), new ur.Point(86, 203), new ur.Point(82, 206), new ur.Point(80, 209), new ur.Point(75, 213), new ur.Point(73, 213), new ur.Point(70, 216), new ur.Point(67, 219), new ur.Point(64, 221), new ur.Point(61, 223), new ur.Point(60, 225), new ur.Point(62, 226), new ur.Point(65, 225), new ur.Point(67, 226), new ur.Point(74, 226), new ur.Point(77, 227), new ur.Point(85, 229), new ur.Point(91, 230), new ur.Point(99, 231), new ur.Point(108, 232), new ur.Point(116, 233), new ur.Point(125, 233), new ur.Point(134, 234), new ur.Point(145, 233), new ur.Point(153, 232), new ur.Point(160, 233), new ur.Point(170, 234), new ur.Point(177, 235), new ur.Point(179, 236), new ur.Point(186, 237), new ur.Point(193, 238), new ur.Point(198, 239), new ur.Point(200, 237), new ur.Point(202, 239), new ur.Point(204, 238), new ur.Point(206, 234), new ur.Point(205, 230), new ur.Point(202, 222), new ur.Point(197, 216), new ur.Point(192, 207), new ur.Point(186, 198), new ur.Point(179, 189), new ur.Point(174, 183), new ur.Point(170, 178), new ur.Point(164, 171), new ur.Point(161, 168), new ur.Point(154, 160), new ur.Point(148, 155), new ur.Point(143, 150), new ur.Point(138, 148), new ur.Point(136, 148)));
		// this.gestureUtil.addGesture("x",
		// 	new Array(new ur.Point(87, 142), new ur.Point(89, 145), new ur.Point(91, 148), new ur.Point(93, 151), new ur.Point(96, 155), new ur.Point(98, 157), new ur.Point(100, 160), new ur.Point(102, 162), new ur.Point(106, 167), new ur.Point(108, 169), new ur.Point(110, 171), new ur.Point(115, 177), new ur.Point(119, 183), new ur.Point(123, 189), new ur.Point(127, 193), new ur.Point(129, 196), new ur.Point(133, 200), new ur.Point(137, 206), new ur.Point(140, 209), new ur.Point(143, 212), new ur.Point(146, 215), new ur.Point(151, 220), new ur.Point(153, 222), new ur.Point(155, 223), new ur.Point(157, 225), new ur.Point(158, 223), new ur.Point(157, 218), new ur.Point(155, 211), new ur.Point(154, 208), new ur.Point(152, 200), new ur.Point(150, 189), new ur.Point(148, 179), new ur.Point(147, 170), new ur.Point(147, 158), new ur.Point(147, 148), new ur.Point(147, 141), new ur.Point(147, 136), new ur.Point(144, 135), new ur.Point(142, 137), new ur.Point(140, 139), new ur.Point(135, 145), new ur.Point(131, 152), new ur.Point(124, 163), new ur.Point(116, 177), new ur.Point(108, 191), new ur.Point(100, 206), new ur.Point(94, 217), new ur.Point(91, 222), new ur.Point(89, 225), new ur.Point(87, 226), new ur.Point(87, 224)));
		// this.gestureUtil.addGesture("rectangle",
		// 	new Array(new ur.Point(78, 149), new ur.Point(78, 153), new ur.Point(78, 157), new ur.Point(78, 160), new ur.Point(79, 162), new ur.Point(79, 164), new ur.Point(79, 167), new ur.Point(79, 169), new ur.Point(79, 173), new ur.Point(79, 178), new ur.Point(79, 183), new ur.Point(80, 189), new ur.Point(80, 193), new ur.Point(80, 198), new ur.Point(80, 202), new ur.Point(81, 208), new ur.Point(81, 210), new ur.Point(81, 216), new ur.Point(82, 222), new ur.Point(82, 224), new ur.Point(82, 227), new ur.Point(83, 229), new ur.Point(83, 231), new ur.Point(85, 230), new ur.Point(88, 232), new ur.Point(90, 233), new ur.Point(92, 232), new ur.Point(94, 233), new ur.Point(99, 232), new ur.Point(102, 233), new ur.Point(106, 233), new ur.Point(109, 234), new ur.Point(117, 235), new ur.Point(123, 236), new ur.Point(126, 236), new ur.Point(135, 237), new ur.Point(142, 238), new ur.Point(145, 238), new ur.Point(152, 238), new ur.Point(154, 239), new ur.Point(165, 238), new ur.Point(174, 237), new ur.Point(179, 236), new ur.Point(186, 235), new ur.Point(191, 235), new ur.Point(195, 233), new ur.Point(197, 233), new ur.Point(200, 233), new ur.Point(201, 235), new ur.Point(201, 233), new ur.Point(199, 231), new ur.Point(198, 226), new ur.Point(198, 220), new ur.Point(196, 207), new ur.Point(195, 195), new ur.Point(195, 181), new ur.Point(195, 173), new ur.Point(195, 163), new ur.Point(194, 155), new ur.Point(192, 145), new ur.Point(192, 143), new ur.Point(192, 138), new ur.Point(191, 135), new ur.Point(191, 133), new ur.Point(191, 130), new ur.Point(190, 128), new ur.Point(188, 129), new ur.Point(186, 129), new ur.Point(181, 132), new ur.Point(173, 131), new ur.Point(162, 131), new ur.Point(151, 132), new ur.Point(149, 132), new ur.Point(138, 132), new ur.Point(136, 132), new ur.Point(122, 131), new ur.Point(120, 131), new ur.Point(109, 130), new ur.Point(107, 130), new ur.Point(90, 132), new ur.Point(81, 133), new ur.Point(76, 133)));
		this.gestureUtil.addGesture("circle",
			new Array(new ur.Point(127, 141), new ur.Point(124, 140), new ur.Point(120, 139), new ur.Point(118, 139), new ur.Point(116, 139), new ur.Point(111, 140), new ur.Point(109, 141), new ur.Point(104, 144), new ur.Point(100, 147), new ur.Point(96, 152), new ur.Point(93, 157), new ur.Point(90, 163), new ur.Point(87, 169), new ur.Point(85, 175), new ur.Point(83, 181), new ur.Point(82, 190), new ur.Point(82, 195), new ur.Point(83, 200), new ur.Point(84, 205), new ur.Point(88, 213), new ur.Point(91, 216), new ur.Point(96, 219), new ur.Point(103, 222), new ur.Point(108, 224), new ur.Point(111, 224), new ur.Point(120, 224), new ur.Point(133, 223), new ur.Point(142, 222), new ur.Point(152, 218), new ur.Point(160, 214), new ur.Point(167, 210), new ur.Point(173, 204), new ur.Point(178, 198), new ur.Point(179, 196), new ur.Point(182, 188), new ur.Point(182, 177), new ur.Point(178, 167), new ur.Point(170, 150), new ur.Point(163, 138), new ur.Point(152, 130), new ur.Point(143, 129), new ur.Point(140, 131), new ur.Point(129, 136), new ur.Point(126, 139)));
		// this.gestureUtil.addGesture("check",
		// 	new Array(new ur.Point(91, 185), new ur.Point(93, 185), new ur.Point(95, 185), new ur.Point(97, 185), new ur.Point(100, 188), new ur.Point(102, 189), new ur.Point(104, 190), new ur.Point(106, 193), new ur.Point(108, 195), new ur.Point(110, 198), new ur.Point(112, 201), new ur.Point(114, 204), new ur.Point(115, 207), new ur.Point(117, 210), new ur.Point(118, 212), new ur.Point(120, 214), new ur.Point(121, 217), new ur.Point(122, 219), new ur.Point(123, 222), new ur.Point(124, 224), new ur.Point(126, 226), new ur.Point(127, 229), new ur.Point(129, 231), new ur.Point(130, 233), new ur.Point(129, 231), new ur.Point(129, 228), new ur.Point(129, 226), new ur.Point(129, 224), new ur.Point(129, 221), new ur.Point(129, 218), new ur.Point(129, 212), new ur.Point(129, 208), new ur.Point(130, 198), new ur.Point(132, 189), new ur.Point(134, 182), new ur.Point(137, 173), new ur.Point(143, 164), new ur.Point(147, 157), new ur.Point(151, 151), new ur.Point(155, 144), new ur.Point(161, 137), new ur.Point(165, 131), new ur.Point(171, 122), new ur.Point(174, 118), new ur.Point(176, 114), new ur.Point(177, 112), new ur.Point(177, 114), new ur.Point(175, 116), new ur.Point(173, 118)));
		this.gestureUtil.addGesture("caret",
			new Array(new ur.Point(79, 245), new ur.Point(79, 242), new ur.Point(79, 239), new ur.Point(80, 237), new ur.Point(80, 234), new ur.Point(81, 232), new ur.Point(82, 230), new ur.Point(84, 224), new ur.Point(86, 220), new ur.Point(86, 218), new ur.Point(87, 216), new ur.Point(88, 213), new ur.Point(90, 207), new ur.Point(91, 202), new ur.Point(92, 200), new ur.Point(93, 194), new ur.Point(94, 192), new ur.Point(96, 189), new ur.Point(97, 186), new ur.Point(100, 179), new ur.Point(102, 173), new ur.Point(105, 165), new ur.Point(107, 160), new ur.Point(109, 158), new ur.Point(112, 151), new ur.Point(115, 144), new ur.Point(117, 139), new ur.Point(119, 136), new ur.Point(119, 134), new ur.Point(120, 132), new ur.Point(121, 129), new ur.Point(122, 127), new ur.Point(124, 125), new ur.Point(126, 124), new ur.Point(129, 125), new ur.Point(131, 127), new ur.Point(132, 130), new ur.Point(136, 139), new ur.Point(141, 154), new ur.Point(145, 166), new ur.Point(151, 182), new ur.Point(156, 193), new ur.Point(157, 196), new ur.Point(161, 209), new ur.Point(162, 211), new ur.Point(167, 223), new ur.Point(169, 229), new ur.Point(170, 231), new ur.Point(173, 237), new ur.Point(176, 242), new ur.Point(177, 244), new ur.Point(179, 250), new ur.Point(181, 255), new ur.Point(182, 257)));
		// this.gestureUtil.addGesture("zig-zag",
		// 	new Array(new ur.Point(307, 216), new ur.Point(333, 186), new ur.Point(356, 215), new ur.Point(375, 186), new ur.Point(399, 216), new ur.Point(418, 186)));
		// this.gestureUtil.addGesture("arrow",
		// 	new Array(new ur.Point(68, 222), new ur.Point(70, 220), new ur.Point(73, 218), new ur.Point(75, 217), new ur.Point(77, 215), new ur.Point(80, 213), new ur.Point(82, 212), new ur.Point(84, 210), new ur.Point(87, 209), new ur.Point(89, 208), new ur.Point(92, 206), new ur.Point(95, 204), new ur.Point(101, 201), new ur.Point(106, 198), new ur.Point(112, 194), new ur.Point(118, 191), new ur.Point(124, 187), new ur.Point(127, 186), new ur.Point(132, 183), new ur.Point(138, 181), new ur.Point(141, 180), new ur.Point(146, 178), new ur.Point(154, 173), new ur.Point(159, 171), new ur.Point(161, 170), new ur.Point(166, 167), new ur.Point(168, 167), new ur.Point(171, 166), new ur.Point(174, 164), new ur.Point(177, 162), new ur.Point(180, 160), new ur.Point(182, 158), new ur.Point(183, 156), new ur.Point(181, 154), new ur.Point(178, 153), new ur.Point(171, 153), new ur.Point(164, 153), new ur.Point(160, 153), new ur.Point(150, 154), new ur.Point(147, 155), new ur.Point(141, 157), new ur.Point(137, 158), new ur.Point(135, 158), new ur.Point(137, 158), new ur.Point(140, 157), new ur.Point(143, 156), new ur.Point(151, 154), new ur.Point(160, 152), new ur.Point(170, 149), new ur.Point(179, 147), new ur.Point(185, 145), new ur.Point(192, 144), new ur.Point(196, 144), new ur.Point(198, 144), new ur.Point(200, 144), new ur.Point(201, 147), new ur.Point(199, 149), new ur.Point(194, 157), new ur.Point(191, 160), new ur.Point(186, 167), new ur.Point(180, 176), new ur.Point(177, 179), new ur.Point(171, 187), new ur.Point(169, 189), new ur.Point(165, 194), new ur.Point(164, 196)));
		// this.gestureUtil.addGesture("left square bracket",
		// 	new Array(new ur.Point(140, 124), new ur.Point(138, 123), new ur.Point(135, 122), new ur.Point(133, 123), new ur.Point(130, 123), new ur.Point(128, 124), new ur.Point(125, 125), new ur.Point(122, 124), new ur.Point(120, 124), new ur.Point(118, 124), new ur.Point(116, 125), new ur.Point(113, 125), new ur.Point(111, 125), new ur.Point(108, 124), new ur.Point(106, 125), new ur.Point(104, 125), new ur.Point(102, 124), new ur.Point(100, 123), new ur.Point(98, 123), new ur.Point(95, 124), new ur.Point(93, 123), new ur.Point(90, 124), new ur.Point(88, 124), new ur.Point(85, 125), new ur.Point(83, 126), new ur.Point(81, 127), new ur.Point(81, 129), new ur.Point(82, 131), new ur.Point(82, 134), new ur.Point(83, 138), new ur.Point(84, 141), new ur.Point(84, 144), new ur.Point(85, 148), new ur.Point(85, 151), new ur.Point(86, 156), new ur.Point(86, 160), new ur.Point(86, 164), new ur.Point(86, 168), new ur.Point(87, 171), new ur.Point(87, 175), new ur.Point(87, 179), new ur.Point(87, 182), new ur.Point(87, 186), new ur.Point(88, 188), new ur.Point(88, 195), new ur.Point(88, 198), new ur.Point(88, 201), new ur.Point(88, 207), new ur.Point(89, 211), new ur.Point(89, 213), new ur.Point(89, 217), new ur.Point(89, 222), new ur.Point(88, 225), new ur.Point(88, 229), new ur.Point(88, 231), new ur.Point(88, 233), new ur.Point(88, 235), new ur.Point(89, 237), new ur.Point(89, 240), new ur.Point(89, 242), new ur.Point(91, 241), new ur.Point(94, 241), new ur.Point(96, 240), new ur.Point(98, 239), new ur.Point(105, 240), new ur.Point(109, 240), new ur.Point(113, 239), new ur.Point(116, 240), new ur.Point(121, 239), new ur.Point(130, 240), new ur.Point(136, 237), new ur.Point(139, 237), new ur.Point(144, 238), new ur.Point(151, 237), new ur.Point(157, 236), new ur.Point(159, 237)));
		// this.gestureUtil.addGesture("right square bracket",
		// 	new Array(new ur.Point(112, 138), new ur.Point(112, 136), new ur.Point(115, 136), new ur.Point(118, 137), new ur.Point(120, 136), new ur.Point(123, 136), new ur.Point(125, 136), new ur.Point(128, 136), new ur.Point(131, 136), new ur.Point(134, 135), new ur.Point(137, 135), new ur.Point(140, 134), new ur.Point(143, 133), new ur.Point(145, 132), new ur.Point(147, 132), new ur.Point(149, 132), new ur.Point(152, 132), new ur.Point(153, 134), new ur.Point(154, 137), new ur.Point(155, 141), new ur.Point(156, 144), new ur.Point(157, 152), new ur.Point(158, 161), new ur.Point(160, 170), new ur.Point(162, 182), new ur.Point(164, 192), new ur.Point(166, 200), new ur.Point(167, 209), new ur.Point(168, 214), new ur.Point(168, 216), new ur.Point(169, 221), new ur.Point(169, 223), new ur.Point(169, 228), new ur.Point(169, 231), new ur.Point(166, 233), new ur.Point(164, 234), new ur.Point(161, 235), new ur.Point(155, 236), new ur.Point(147, 235), new ur.Point(140, 233), new ur.Point(131, 233), new ur.Point(124, 233), new ur.Point(117, 235), new ur.Point(114, 238), new ur.Point(112, 238)));
		this.gestureUtil.addGesture("v",
			new Array(new ur.Point(89, 164), new ur.Point(90, 162), new ur.Point(92, 162), new ur.Point(94, 164), new ur.Point(95, 166), new ur.Point(96, 169), new ur.Point(97, 171), new ur.Point(99, 175), new ur.Point(101, 178), new ur.Point(103, 182), new ur.Point(106, 189), new ur.Point(108, 194), new ur.Point(111, 199), new ur.Point(114, 204), new ur.Point(117, 209), new ur.Point(119, 214), new ur.Point(122, 218), new ur.Point(124, 222), new ur.Point(126, 225), new ur.Point(128, 228), new ur.Point(130, 229), new ur.Point(133, 233), new ur.Point(134, 236), new ur.Point(136, 239), new ur.Point(138, 240), new ur.Point(139, 242), new ur.Point(140, 244), new ur.Point(142, 242), new ur.Point(142, 240), new ur.Point(142, 237), new ur.Point(143, 235), new ur.Point(143, 233), new ur.Point(145, 229), new ur.Point(146, 226), new ur.Point(148, 217), new ur.Point(149, 208), new ur.Point(149, 205), new ur.Point(151, 196), new ur.Point(151, 193), new ur.Point(153, 182), new ur.Point(155, 172), new ur.Point(157, 165), new ur.Point(159, 160), new ur.Point(162, 155), new ur.Point(164, 150), new ur.Point(165, 148), new ur.Point(166, 146)));
		// this.gestureUtil.addGesture("delete",
		// 	new Array(new ur.Point(123, 129), new ur.Point(123, 131), new ur.Point(124, 133), new ur.Point(125, 136), new ur.Point(127, 140), new ur.Point(129, 142), new ur.Point(133, 148), new ur.Point(137, 154), new ur.Point(143, 158), new ur.Point(145, 161), new ur.Point(148, 164), new ur.Point(153, 170), new ur.Point(158, 176), new ur.Point(160, 178), new ur.Point(164, 183), new ur.Point(168, 188), new ur.Point(171, 191), new ur.Point(175, 196), new ur.Point(178, 200), new ur.Point(180, 202), new ur.Point(181, 205), new ur.Point(184, 208), new ur.Point(186, 210), new ur.Point(187, 213), new ur.Point(188, 215), new ur.Point(186, 212), new ur.Point(183, 211), new ur.Point(177, 208), new ur.Point(169, 206), new ur.Point(162, 205), new ur.Point(154, 207), new ur.Point(145, 209), new ur.Point(137, 210), new ur.Point(129, 214), new ur.Point(122, 217), new ur.Point(118, 218), new ur.Point(111, 221), new ur.Point(109, 222), new ur.Point(110, 219), new ur.Point(112, 217), new ur.Point(118, 209), new ur.Point(120, 207), new ur.Point(128, 196), new ur.Point(135, 187), new ur.Point(138, 183), new ur.Point(148, 167), new ur.Point(157, 153), new ur.Point(163, 145), new ur.Point(165, 142), new ur.Point(172, 133), new ur.Point(177, 127), new ur.Point(179, 127), new ur.Point(180, 125)));
		// this.gestureUtil.addGesture("left curly brace",
		// 	new Array(new ur.Point(150, 116), new ur.Point(147, 117), new ur.Point(145, 116), new ur.Point(142, 116), new ur.Point(139, 117), new ur.Point(136, 117), new ur.Point(133, 118), new ur.Point(129, 121), new ur.Point(126, 122), new ur.Point(123, 123), new ur.Point(120, 125), new ur.Point(118, 127), new ur.Point(115, 128), new ur.Point(113, 129), new ur.Point(112, 131), new ur.Point(113, 134), new ur.Point(115, 134), new ur.Point(117, 135), new ur.Point(120, 135), new ur.Point(123, 137), new ur.Point(126, 138), new ur.Point(129, 140), new ur.Point(135, 143), new ur.Point(137, 144), new ur.Point(139, 147), new ur.Point(141, 149), new ur.Point(140, 152), new ur.Point(139, 155), new ur.Point(134, 159), new ur.Point(131, 161), new ur.Point(124, 166), new ur.Point(121, 166), new ur.Point(117, 166), new ur.Point(114, 167), new ur.Point(112, 166), new ur.Point(114, 164), new ur.Point(116, 163), new ur.Point(118, 163), new ur.Point(120, 162), new ur.Point(122, 163), new ur.Point(125, 164), new ur.Point(127, 165), new ur.Point(129, 166), new ur.Point(130, 168), new ur.Point(129, 171), new ur.Point(127, 175), new ur.Point(125, 179), new ur.Point(123, 184), new ur.Point(121, 190), new ur.Point(120, 194), new ur.Point(119, 199), new ur.Point(120, 202), new ur.Point(123, 207), new ur.Point(127, 211), new ur.Point(133, 215), new ur.Point(142, 219), new ur.Point(148, 220), new ur.Point(151, 221)));
		// this.gestureUtil.addGesture("right curly brace",
		// 	new Array(new ur.Point(117, 132), new ur.Point(115, 132), new ur.Point(115, 129), new ur.Point(117, 129), new ur.Point(119, 128), new ur.Point(122, 127), new ur.Point(125, 127), new ur.Point(127, 127), new ur.Point(130, 127), new ur.Point(133, 129), new ur.Point(136, 129), new ur.Point(138, 130), new ur.Point(140, 131), new ur.Point(143, 134), new ur.Point(144, 136), new ur.Point(145, 139), new ur.Point(145, 142), new ur.Point(145, 145), new ur.Point(145, 147), new ur.Point(145, 149), new ur.Point(144, 152), new ur.Point(142, 157), new ur.Point(141, 160), new ur.Point(139, 163), new ur.Point(137, 166), new ur.Point(135, 167), new ur.Point(133, 169), new ur.Point(131, 172), new ur.Point(128, 173), new ur.Point(126, 176), new ur.Point(125, 178), new ur.Point(125, 180), new ur.Point(125, 182), new ur.Point(126, 184), new ur.Point(128, 187), new ur.Point(130, 187), new ur.Point(132, 188), new ur.Point(135, 189), new ur.Point(140, 189), new ur.Point(145, 189), new ur.Point(150, 187), new ur.Point(155, 186), new ur.Point(157, 185), new ur.Point(159, 184), new ur.Point(156, 185), new ur.Point(154, 185), new ur.Point(149, 185), new ur.Point(145, 187), new ur.Point(141, 188), new ur.Point(136, 191), new ur.Point(134, 191), new ur.Point(131, 192), new ur.Point(129, 193), new ur.Point(129, 195), new ur.Point(129, 197), new ur.Point(131, 200), new ur.Point(133, 202), new ur.Point(136, 206), new ur.Point(139, 211), new ur.Point(142, 215), new ur.Point(145, 220), new ur.Point(147, 225), new ur.Point(148, 231), new ur.Point(147, 239), new ur.Point(144, 244), new ur.Point(139, 248), new ur.Point(134, 250), new ur.Point(126, 253), new ur.Point(119, 253), new ur.Point(115, 253)));
		this.gestureUtil.addGesture("star",
			new Array(new ur.Point(75, 250), new ur.Point(75, 247), new ur.Point(77, 244), new ur.Point(78, 242), new ur.Point(79, 239), new ur.Point(80, 237), new ur.Point(82, 234), new ur.Point(82, 232), new ur.Point(84, 229), new ur.Point(85, 225), new ur.Point(87, 222), new ur.Point(88, 219), new ur.Point(89, 216), new ur.Point(91, 212), new ur.Point(92, 208), new ur.Point(94, 204), new ur.Point(95, 201), new ur.Point(96, 196), new ur.Point(97, 194), new ur.Point(98, 191), new ur.Point(100, 185), new ur.Point(102, 178), new ur.Point(104, 173), new ur.Point(104, 171), new ur.Point(105, 164), new ur.Point(106, 158), new ur.Point(107, 156), new ur.Point(107, 152), new ur.Point(108, 145), new ur.Point(109, 141), new ur.Point(110, 139), new ur.Point(112, 133), new ur.Point(113, 131), new ur.Point(116, 127), new ur.Point(117, 125), new ur.Point(119, 122), new ur.Point(121, 121), new ur.Point(123, 120), new ur.Point(125, 122), new ur.Point(125, 125), new ur.Point(127, 130), new ur.Point(128, 133), new ur.Point(131, 143), new ur.Point(136, 153), new ur.Point(140, 163), new ur.Point(144, 172), new ur.Point(145, 175), new ur.Point(151, 189), new ur.Point(156, 201), new ur.Point(161, 213), new ur.Point(166, 225), new ur.Point(169, 233), new ur.Point(171, 236), new ur.Point(174, 243), new ur.Point(177, 247), new ur.Point(178, 249), new ur.Point(179, 251), new ur.Point(180, 253), new ur.Point(180, 255), new ur.Point(179, 257), new ur.Point(177, 257), new ur.Point(174, 255), new ur.Point(169, 250), new ur.Point(164, 247), new ur.Point(160, 245), new ur.Point(149, 238), new ur.Point(138, 230), new ur.Point(127, 221), new ur.Point(124, 220), new ur.Point(112, 212), new ur.Point(110, 210), new ur.Point(96, 201), new ur.Point(84, 195), new ur.Point(74, 190), new ur.Point(64, 182), new ur.Point(55, 175), new ur.Point(51, 172), new ur.Point(49, 170), new ur.Point(51, 169), new ur.Point(56, 169), new ur.Point(66, 169), new ur.Point(78, 168), new ur.Point(92, 166), new ur.Point(107, 164), new ur.Point(123, 161), new ur.Point(140, 162), new ur.Point(156, 162), new ur.Point(171, 160), new ur.Point(173, 160), new ur.Point(186, 160), new ur.Point(195, 160), new ur.Point(198, 161), new ur.Point(203, 163), new ur.Point(208, 163), new ur.Point(206, 164), new ur.Point(200, 167), new ur.Point(187, 172), new ur.Point(174, 179), new ur.Point(172, 181), new ur.Point(153, 192), new ur.Point(137, 201), new ur.Point(123, 211), new ur.Point(112, 220), new ur.Point(99, 229), new ur.Point(90, 237), new ur.Point(80, 244), new ur.Point(73, 250), new ur.Point(69, 254), new ur.Point(69, 252)));
		this.gestureUtil.addGesture("pigtail",
			new Array(new ur.Point(81, 219), new ur.Point(84, 218), new ur.Point(86, 220), new ur.Point(88, 220), new ur.Point(90, 220), new ur.Point(92, 219), new ur.Point(95, 220), new ur.Point(97, 219), new ur.Point(99, 220), new ur.Point(102, 218), new ur.Point(105, 217), new ur.Point(107, 216), new ur.Point(110, 216), new ur.Point(113, 214), new ur.Point(116, 212), new ur.Point(118, 210), new ur.Point(121, 208), new ur.Point(124, 205), new ur.Point(126, 202), new ur.Point(129, 199), new ur.Point(132, 196), new ur.Point(136, 191), new ur.Point(139, 187), new ur.Point(142, 182), new ur.Point(144, 179), new ur.Point(146, 174), new ur.Point(148, 170), new ur.Point(149, 168), new ur.Point(151, 162), new ur.Point(152, 160), new ur.Point(152, 157), new ur.Point(152, 155), new ur.Point(152, 151), new ur.Point(152, 149), new ur.Point(152, 146), new ur.Point(149, 142), new ur.Point(148, 139), new ur.Point(145, 137), new ur.Point(141, 135), new ur.Point(139, 135), new ur.Point(134, 136), new ur.Point(130, 140), new ur.Point(128, 142), new ur.Point(126, 145), new ur.Point(122, 150), new ur.Point(119, 158), new ur.Point(117, 163), new ur.Point(115, 170), new ur.Point(114, 175), new ur.Point(117, 184), new ur.Point(120, 190), new ur.Point(125, 199), new ur.Point(129, 203), new ur.Point(133, 208), new ur.Point(138, 213), new ur.Point(145, 215), new ur.Point(155, 218), new ur.Point(164, 219), new ur.Point(166, 219), new ur.Point(177, 219), new ur.Point(182, 218), new ur.Point(192, 216), new ur.Point(196, 213), new ur.Point(199, 212), new ur.Point(201, 211)));
	}

	addEvent(target): void {
		target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
	}

	dispose(target): void {
		target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
	}

	addTouchEvent(tar) {
		tar.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
		tar.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
	}

	disposeTouchEvent(tar) {
		tar.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
		tar.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
	}

	//响应函数
	private mouseDown = (evt: egret.TouchEvent) => {
		this._layer.graphics.clear();
		this._layer.graphics.lineStyle(15, 0xbefe24);
		var p: ur.Point;
		switch (GameGestureItemClass.isLocal) {
			case true:
				p = new ur.Point(evt.localX, evt.localY);
				break;
			case false:
				p = new ur.Point(evt.stageX, evt.stageY);
				break;
		}
		var ep: Array<number>;
		switch (GameGestureItemClass.isLocal) {
			case true:
				ep = [evt.localX, evt.localY];
				break;
			case false:
				ep = [evt.stageX, evt.stageY];
				break;
		}
		this._mouseEffectPoints.push(ep);
		this._currentPoint = p;
		this._layer.graphics.moveTo(this._currentPoint.x, this._currentPoint.y);
		this._mousePoints = [];
		this._mousePoints.push(p);
		this.startTime = new Date().getTime();

		this.stage.addChild(this.touchMask);
		this.addTouchEvent(this.touchMask);
	}

	private mouseMove = (evt: egret.TouchEvent) => {
		var p: ur.Point;
		switch (GameGestureItemClass.isLocal) {
			case true:
				p = new ur.Point(evt.localX, evt.localY);
				break;
			case false:
				p = new ur.Point(evt.stageX, evt.stageY);
				break;
		}
		var ep: Array<number>;
		switch (GameGestureItemClass.isLocal) {
			case true:
				ep = [evt.localX, evt.localY];
				break;
			case false:
				ep = [evt.stageX, evt.stageY];
				break;
		}
		this._mouseEffectPoints.push(ep);
		this._mousePoints.push(p);
		this._layer.graphics.lineTo(p.x, p.y);
		this._currentPoint = p;
	}

	private mouseUp = (evt: egret.TouchEvent) => {
		App.TimerManager.remove(this.clear, this);
		var p: ur.Point;
		switch (GameGestureItemClass.isLocal) {
			case true:
				p = new ur.Point(evt.localX, evt.localY);
				break;
			case false:
				p = new ur.Point(evt.stageX, evt.stageY);
				break;
		}
		this._mousePoints.push(p);
		// egret.log('===================');
		let result = this.gestureUtil.recognize(this._mousePoints, false);
		let timeUsed = new Date().getTime() - this.startTime;
		// egret.log('time ==>', timeUsed);
		// egret.log('name:', result.name, 'score:', result.score);
		// let str = '手势名: ' + result.name + ',相似度: ' + result.score + ",用时：" + timeUsed;
		// window.alert(str);
		// console.log(result.score, result.name);
		if (result.score >= 0.7) {
			GameGestureItemClass.gestureType = result.name;
			GameGestureItemClass.gestureScore = result.score;
			App.TimerManager.doTimer(100, 1, this.clear, this)
		}
		this._layer.graphics.clear();

		if (this._mouseEffectPoints.length < 200) {
			let _effectBuffer: Array<egret.DisplayObject> = [];
			for (let index = 0; index < this._mouseEffectPoints.length; index++) {
				let mouseEffect = new particle.GravityParticleSystem(this.particleStarsTexture, this.particleStarsConfig);
				this.addChild(mouseEffect);
				_effectBuffer.push(mouseEffect);
				mouseEffect.emitterX = this._mouseEffectPoints[index][0];
				mouseEffect.emitterY = this._mouseEffectPoints[index][1];
				if (this._mouseEffectPoints.length <= 20) {
					mouseEffect.maxParticles = 3;
				} else if (this._mouseEffectPoints.length > 20 && this._mouseEffectPoints.length < 50) {
					mouseEffect.maxParticles = 2;
				} else {
					mouseEffect.maxParticles = 1;
				}

				mouseEffect.start(300);
			}
			egret.setTimeout(() => {
				for (let index = 0; index < _effectBuffer.length; index++) {
					this.removeChild(_effectBuffer[index]);
				}
			}, this, 320);
		}

		this._mouseEffectPoints.splice(0, this._mouseEffectPoints.length);
		// App.TimerManager.doTimer(300, 1, () => {
		// 	this._effectBuffer.forEach(element => {
		// 		this.removeChild(element);
		// 	});
		// 	this._mouseEffectPoints.splice(0, this._mouseEffectPoints.length);
		// 	this._effectBuffer.splice(0, this._effectBuffer.length);
		// }, this);

		this.stage.removeChild(this.touchMask);
		this.disposeTouchEvent(this.touchMask);
	}

	private clear = () => {
		GameGestureItemClass.gestureType = undefined;
		GameGestureItemClass.gestureScore = undefined;
	}
}