/**
 * Copyright (c) 2006
 * Martin Czuchra, Nicolas Peters, Daniel Polak, Willi Tscheschner
 * Copyright (c) 2009-2011 Intalio, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 **/

Array.prototype.insertFrom = function(from, to){
	to 			= Math.max(0, to);
	from 		= Math.min( Math.max(0, from), this.length-1 );
		
	var el 		= this[from];
	var old 	= this.without(el);
	var newA 	= old.slice(0, to);
	newA.push(el);
	if(old.length > to ){
		newA 	= newA.concat(old.slice(to))
	};
	return newA;
}

if(!WAPAMA.Plugins)
	WAPAMA.Plugins = new Object();

WAPAMA.Plugins.Arrangement = Clazz.extend({

	facade: undefined,

	construct: function(facade) {
		this.facade = facade;

		// Z-Ordering
		this.facade.offer({
			'name':WAPAMA.I18N.Arrangement.btf,
			'functionality': this.setZLevel.bind(this, this.setToTop),
			'group': WAPAMA.I18N.Arrangement.groupZ,
			'icon': WAPAMA.PATH + "images/shape_move_front.png",
			'description': WAPAMA.I18N.Arrangement.btfDesc,
			'index': 1,
			'minShape': 1});
			
		this.facade.offer({
			'name':WAPAMA.I18N.Arrangement.btb,
			'functionality': this.setZLevel.bind(this, this.setToBack),
			'group': WAPAMA.I18N.Arrangement.groupZ,
			'icon': WAPAMA.PATH + "images/shape_move_back.png",
			'description': WAPAMA.I18N.Arrangement.btbDesc,
			'index': 2,
			'minShape': 1});

		this.facade.offer({
			'name':WAPAMA.I18N.Arrangement.bf,
			'functionality': this.setZLevel.bind(this, this.setForward),
			'group': WAPAMA.I18N.Arrangement.groupZ,
			'icon': WAPAMA.PATH + "images/shape_move_forwards.png",
			'description': WAPAMA.I18N.Arrangement.bfDesc,
			'index': 3,
			'minShape': 1});

		this.facade.offer({
			'name':WAPAMA.I18N.Arrangement.bb,
			'functionality': this.setZLevel.bind(this, this.setBackward),
			'group': WAPAMA.I18N.Arrangement.groupZ,
			'icon': WAPAMA.PATH + "images/shape_move_backwards.png",
			'description': WAPAMA.I18N.Arrangement.bbDesc,
			'index': 4,
			'minShape': 1});

		// Aligment
		this.facade.offer({
			'name':WAPAMA.I18N.Arrangement.ab,
			'functionality': this.alignShapes.bind(this, [WAPAMA.CONFIG.EDITOR_ALIGN_BOTTOM]),
			'group': WAPAMA.I18N.Arrangement.groupA,
			'icon': WAPAMA.PATH + "images/shape_align_bottom.png",
			'description': WAPAMA.I18N.Arrangement.abDesc,
			'index': 1,
			'minShape': 2});

		this.facade.offer({
			'name':WAPAMA.I18N.Arrangement.am,
			'functionality': this.alignShapes.bind(this, [WAPAMA.CONFIG.EDITOR_ALIGN_MIDDLE]),
			'group': WAPAMA.I18N.Arrangement.groupA,
			'icon': WAPAMA.PATH + "images/shape_align_middle.png",
			'description': WAPAMA.I18N.Arrangement.amDesc,
			'index': 2,
			'minShape': 2});

		this.facade.offer({
			'name':WAPAMA.I18N.Arrangement.at,
			'functionality': this.alignShapes.bind(this, [WAPAMA.CONFIG.EDITOR_ALIGN_TOP]),
			'group': WAPAMA.I18N.Arrangement.groupA,
			'icon': WAPAMA.PATH + "images/shape_align_top.png",
			'description': WAPAMA.I18N.Arrangement.atDesc,
			'index': 3,
			'minShape': 2});

		this.facade.offer({
			'name':WAPAMA.I18N.Arrangement.al,
			'functionality': this.alignShapes.bind(this, [WAPAMA.CONFIG.EDITOR_ALIGN_LEFT]),
			'group': WAPAMA.I18N.Arrangement.groupA,
			'icon': WAPAMA.PATH + "images/shape_align_left.png",
			'description': WAPAMA.I18N.Arrangement.alDesc,
			'index': 4,
			'minShape': 2});

		this.facade.offer({
			'name':WAPAMA.I18N.Arrangement.ac,
			'functionality': this.alignShapes.bind(this, [WAPAMA.CONFIG.EDITOR_ALIGN_CENTER]),
			'group': WAPAMA.I18N.Arrangement.groupA,
			'icon': WAPAMA.PATH + "images/shape_align_center.png",
			'description': WAPAMA.I18N.Arrangement.acDesc,
			'index': 5,
			'minShape': 2});

		this.facade.offer({
			'name':WAPAMA.I18N.Arrangement.ar,
			'functionality': this.alignShapes.bind(this, [WAPAMA.CONFIG.EDITOR_ALIGN_RIGHT]),
			'group': WAPAMA.I18N.Arrangement.groupA,
			'icon': WAPAMA.PATH + "images/shape_align_right.png",
			'description': WAPAMA.I18N.Arrangement.arDesc,
			'index': 6,
			'minShape': 2});
			
		this.facade.offer({
			'name':WAPAMA.I18N.Arrangement.as,
			'functionality': this.alignShapes.bind(this, [WAPAMA.CONFIG.EDITOR_ALIGN_SIZE]),
			'group': WAPAMA.I18N.Arrangement.groupA,
			'icon': WAPAMA.PATH + "images/shape_align_size.png",
			'description': WAPAMA.I18N.Arrangement.asDesc,
			'index': 7,
			'minShape': 2});
			


		this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_ARRANGEMENT_TOP, 	this.setZLevel.bind(this, this.setToTop)	);
		this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_ARRANGEMENT_BACK, 	this.setZLevel.bind(this, this.setToBack)	);
		this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_ARRANGEMENT_FORWARD, 	this.setZLevel.bind(this, this.setForward)	);
		this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_ARRANGEMENT_BACKWARD, 	this.setZLevel.bind(this, this.setBackward)	);						

	
	},
	
	setZLevel:function(callback, event){
			
		//Command-Pattern for dragging one docker
		var zLevelCommand = WAPAMA.Core.Command.extend({
			construct: function(callback, elements, facade){
				this.callback 	= callback;
				this.elements 	= elements;
				// For redo, the previous elements get stored
				this.elAndIndex	= elements.map(function(el){ return {el:el, previous:el.parent.children[el.parent.children.indexOf(el)-1]} })
				this.facade		= facade;
			},			
			execute: function(){
				
				// Call the defined z-order callback with the elements
				this.callback( this.elements )			
				this.facade.setSelection( this.elements )
			},
			rollback: function(){
				
				// Sort all elements on the index of there containment
				var sortedEl =	this.elAndIndex.sortBy( function( el ) {
									var value 	= el.el;
									var t 		= $A(value.node.parentNode.childNodes);
									return t.indexOf(value.node);
								}); 
				
				// Every element get setted back bevor the old previous element
				for(var i=0; i<sortedEl.length; i++){
					var el			= sortedEl[i].el;
					var p 			= el.parent;			
					var oldIndex 	= p.children.indexOf(el);
					var newIndex 	= p.children.indexOf(sortedEl[i].previous);
					newIndex		= newIndex || 0
					p.children 	= p.children.insertFrom(oldIndex, newIndex)			
					el.node.parentNode.insertBefore(el.node, el.node.parentNode.childNodes[newIndex+1]);
				}

				// Reset the selection
				this.facade.setSelection( this.elements )
			}
		});
	
		// Instanziate the dockCommand
		var command = new zLevelCommand(callback, this.facade.getSelection(), this.facade);
		if( event.excludeCommand ){
			command.execute();
		} else {
			this.facade.executeCommands( [command] );	
		}
		
	},

	setToTop: function(elements) {

		// Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.
		var tmpElem =  elements.sortBy( function(value, index) {
			var t = $A(value.node.parentNode.childNodes);
			return t.indexOf(value.node);
		});
		// Sortiertes Array wird nach oben verschoben.
		tmpElem.each( function(value) {
			var p = value.parent

			p.children = p.children.without( value )
			p.children.push( value );
			value.node.parentNode.appendChild(value.node);			
		});
	},

	setToBack: function(elements) {
		// Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.
		var tmpElem =  elements.sortBy( function(value, index) {
			var t = $A(value.node.parentNode.childNodes);
			return t.indexOf(value.node);
		});

		tmpElem = tmpElem.reverse();

		// Sortiertes Array wird nach unten verschoben.
		tmpElem.each( function(value) {
			var p = value.parent
			p.children = p.children.without( value )
			p.children.unshift( value );
			value.node.parentNode.insertBefore(value.node, value.node.parentNode.firstChild);
		});
		
		
	},

	setBackward: function(elements) {
		// Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.
		var tmpElem =  elements.sortBy( function(value, index) {
			var t = $A(value.node.parentNode.childNodes);
			return t.indexOf(value.node);
		});

		// Reverse the elements
		tmpElem = tmpElem.reverse();
		
		// Delete all Nodes who are the next Node in the nodes-Array
		var compactElem = tmpElem.findAll(function(el) {return !tmpElem.some(function(checkedEl){ return checkedEl.node == el.node.previousSibling})});
		
		// Sortiertes Array wird nach eine Ebene nach oben verschoben.
		compactElem.each( function(el) {
			if(el.node.previousSibling === null) { return; }
			var p 		= el.parent;			
			var index 	= p.children.indexOf(el);
			p.children 	= p.children.insertFrom(index, index-1)			
			el.node.parentNode.insertBefore(el.node, el.node.previousSibling);
		});
		
		
	},

	setForward: function(elements) {
		// Sortieren des Arrays nach dem Index des SVGKnotens im Bezug auf dem Elternknoten.
		var tmpElem =  elements.sortBy( function(value, index) {
			var t = $A(value.node.parentNode.childNodes);
			return t.indexOf(value.node);
		});


		// Delete all Nodes who are the next Node in the nodes-Array
		var compactElem = tmpElem.findAll(function(el) {return !tmpElem.some(function(checkedEl){ return checkedEl.node == el.node.nextSibling})});
	
			
		// Sortiertes Array wird eine Ebene nach unten verschoben.
		compactElem.each( function(el) {
			var nextNode = el.node.nextSibling		
			if(nextNode === null) { return; }
			var index 	= el.parent.children.indexOf(el);
			var p 		= el.parent;
			p.children 	= p.children.insertFrom(index, index+1)			
			el.node.parentNode.insertBefore(nextNode, el.node);
		});
	},


	alignShapes: function(way) {

		var elements = this.facade.getSelection();

		// Set the elements to all Top-Level elements
		elements = this.facade.getCanvas().getShapesWithSharedParent(elements);
		// Get only nodes
		elements = elements.findAll(function(value) {
			return (value instanceof WAPAMA.Core.Node)
		});
		// Delete all attached intermediate events from the array
		elements = elements.findAll(function(value) {
			var d = value.getIncomingShapes()
			return d.length == 0 || !elements.include(d[0])
		});
		if(elements.length < 2) { return; }

		// get bounds of all shapes.
		var bounds = elements[0].absoluteBounds().clone();
		elements.each(function(shape) {
		        bounds.include(shape.absoluteBounds().clone());
		});
		
		// get biggest width and heigth
		var maxWidth = 0;
		var maxHeight = 0;
		elements.each(function(shape){
			maxWidth = Math.max(shape.bounds.width(), maxWidth);
			maxHeight = Math.max(shape.bounds.height(), maxHeight);
		});

		var commandClass = WAPAMA.Core.Command.extend({
			construct: function(elements, bounds, maxHeight, maxWidth, way, facade){
				this.elements = elements;
				this.bounds = bounds;
				this.maxHeight = maxHeight;
				this.maxWidth = maxWidth;
				this.way = way;
				this.facade = facade;
				this.orgPos = [];
			},
			setBounds: function(shape, maxSize) {
				if(!maxSize)
					maxSize = {width: WAPAMA.CONFIG.MAXIMUM_SIZE, height: WAPAMA.CONFIG.MAXIMUM_SIZE};

				if(!shape.bounds) { throw "Bounds not definined." }
				
				var newBounds = {
                    a: {x: shape.bounds.upperLeft().x - (this.maxWidth - shape.bounds.width())/2,
                        y: shape.bounds.upperLeft().y - (this.maxHeight - shape.bounds.height())/2},
                    b: {x: shape.bounds.lowerRight().x + (this.maxWidth - shape.bounds.width())/2,
                        y: shape.bounds.lowerRight().y + (this.maxHeight - shape.bounds.height())/2}
	            }
				
				/* If the new width of shape exceeds the maximum width, set width value to maximum. */
				if(this.maxWidth > maxSize.width) {
					newBounds.a.x = shape.bounds.upperLeft().x - 
									(maxSize.width - shape.bounds.width())/2;
					
					newBounds.b.x =	shape.bounds.lowerRight().x + (maxSize.width - shape.bounds.width())/2
				}
				
				/* If the new height of shape exceeds the maximum height, set height value to maximum. */
				if(this.maxHeight > maxSize.height) {
					newBounds.a.y = shape.bounds.upperLeft().y - 
									(maxSize.height - shape.bounds.height())/2;
					
					newBounds.b.y =	shape.bounds.lowerRight().y + (maxSize.height - shape.bounds.height())/2
				}
				
				/* set bounds of shape */
				shape.bounds.set(newBounds);
				
			},			
			execute: function(){
				// align each shape according to the way that was specified.
				this.elements.each(function(shape, index) {
					this.orgPos[index] = shape.bounds.upperLeft();
					
					var relBounds = this.bounds.clone();
					if (shape.parent && !(shape.parent instanceof WAPAMA.Core.Canvas) ) {
						var upL = shape.parent.absoluteBounds().upperLeft();
						relBounds.moveBy(-upL.x, -upL.y);
					}
					
					switch (this.way) {
						// align the shapes in the requested way.
						case WAPAMA.CONFIG.EDITOR_ALIGN_BOTTOM:
			                shape.bounds.moveTo({
								x: shape.bounds.upperLeft().x,
								y: relBounds.b.y - shape.bounds.height()
							}); break;
		
				        case WAPAMA.CONFIG.EDITOR_ALIGN_MIDDLE:
			                shape.bounds.moveTo({
								x: shape.bounds.upperLeft().x,
								y: (relBounds.a.y + relBounds.b.y - shape.bounds.height()) / 2
							}); break;
		
				        case WAPAMA.CONFIG.EDITOR_ALIGN_TOP:
			                shape.bounds.moveTo({
								x: shape.bounds.upperLeft().x,
								y: relBounds.a.y
							}); break;
		
				        case WAPAMA.CONFIG.EDITOR_ALIGN_LEFT:
			                shape.bounds.moveTo({
								x: relBounds.a.x,
								y: shape.bounds.upperLeft().y
							}); break;
		
				        case WAPAMA.CONFIG.EDITOR_ALIGN_CENTER:
			                shape.bounds.moveTo({
								x: (relBounds.a.x + relBounds.b.x - shape.bounds.width()) / 2,
								y: shape.bounds.upperLeft().y
							}); break;
		
				        case WAPAMA.CONFIG.EDITOR_ALIGN_RIGHT:
			                shape.bounds.moveTo({
								x: relBounds.b.x - shape.bounds.width(),
								y: shape.bounds.upperLeft().y
							}); break;
							
						case WAPAMA.CONFIG.EDITOR_ALIGN_SIZE:
							if(shape.isResizable) {
								this.orgPos[index] = {a: shape.bounds.upperLeft(), b: shape.bounds.lowerRight()};
								this.setBounds(shape, shape.maximumSize);
							}
							break;
					}
					//shape.update()
				}.bind(this));
		
				this.facade.getCanvas().update();
				
				this.facade.updateSelection();
			},
			rollback: function(){
				this.elements.each(function(shape, index) {
					if (this.way == WAPAMA.CONFIG.EDITOR_ALIGN_SIZE) {
						if(shape.isResizable) {shape.bounds.set(this.orgPos[index]);}
					} else {shape.bounds.moveTo(this.orgPos[index]);}
				}.bind(this));
				
				this.facade.getCanvas().update();
				
				this.facade.updateSelection();
			}
		})
		
		var command = new commandClass(elements, bounds, maxHeight, maxWidth, parseInt(way), this.facade);
		
		this.facade.executeCommands([command]);	
	}
});