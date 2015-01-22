// SAMPLE
this.manifest = {
	"name": "Kinetic Web Page",
	"icon": "icon.png",
	"settings": [
		{
			"tab": "Details",
			"group": "Zoom",
			"name": "zoom_sensitivity",
			"type": "slider",
			"label": "Sensitivity:",
			"max": 1,
			"min": 0,
			"step": 0.01,
			"display": true,
			"displayModifier": function (value) {
				return (value * 100).floor() + "%";
			}
		},
		{
			"tab": "Details",
			"group": "Zoom",
			"name": "default_snap",
			"type": "popupButton",
			"label": "Snap to default",
			"options": {
				"values": [
					{
						"value": "yes",
						"text": "Yes"
					},
					{
						"value": "no",
						"text": "No"
					}
				]
			}
		},
		{
			"tab": "Details",
			"group": "Kinetic",
			"name": "kinetic_slowdown",
			"type": "slider",
			"label": "Slowdown:",
			"max": 1,
			"min": 0,
			"step": 0.01,
			"display": true,
			"displayModifier": function (value) {
				return (value * 100).floor() + "%";
			}
		},
		{
			"tab": "Details",
			"group": "Kinetic",
			"name": "kinetic_maxvelocity",
			"type": "slider",
			"label": "Max Velocity:",
			"max": 1,
			"min": 0,
			"step": 0.01,
			"display": true,
			"displayModifier": function (value) {
				return (value * 100).floor() + "%";
			}
		},
		{
			"tab": "Details",
			"group": "Kinetic",
			"name": "kinetic_throttleFPS",
			"type": "slider",
			"label": "Throttle FPS:",
			"max": 1,
			"min": 0,
			"step": 0.01,
			"display": true,
			"displayModifier": function (value) {
				return (value * 100).floor() + "%";
			}
		},
		{
			"tab": "Details",
			"group": "Kinetic",
			"name": "xaxis",
			"type": "popupButton",
			"label": "X Axis Movement",
			"options": {
				"values": [
					{
						"value": "yes",
						"text": "Yes"
					},
					{
						"value": "no",
						"text": "No"
					}
				]
			}
		},
		{
			"tab": "Details",
			"group": "Kinetic",
			"name": "yaxis",
			"type": "popupButton",
			"label": "Y Axis Movement",
			"options": {
				"values": [
					{
						"value": "yes",
						"text": "Yes"
					},
					{
						"value": "no",
						"text": "No"
					}
				]
			}
		}
	],
	"alignment": [
		[
			"zoom_sensitivity"
		],
		[
			"kinetic_slowdown",
			"kinetic_maxvelocity",
			"kinetic_throttleFPS"
		],
		[
			"xaxis",
			"yaxis"
		]
	]
};
