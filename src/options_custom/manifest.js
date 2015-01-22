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
			"label": "Sensitivity (default 6):",
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
			"label": "Snap to default (default Yes)",
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
			"label": "Slowdown (default 9):",
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
			"label": "Max Velocity (default 40):",
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
			"label": "Throttle FPS (default 60):",
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
			"name": "kinetic_xaxis",
			"type": "popupButton",
			"label": "X Axis Movement (default Yes)",
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
			"name": "kinetic_yaxis",
			"type": "popupButton",
			"label": "Y Axis Movement (default Yes)",
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
			"kinetic_xaxis",
			"kinetic_yaxis"
		]
	]
};
