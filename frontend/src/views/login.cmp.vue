<template>
		<div class="card-scene">
			<Container
				orientation="horizontal"
				@drop="onColumnDrop($event)"
				drag-handle-selector=".column-drag-handle"
				@drag-start="dragStart"
                :drop-placeholder="upperDropPlaceholderOptions"
			>
				<Draggable
					v-for="column in scene.children"
					:key="column.id"
				>
					<div :class="column.props.className">
						<div class="card-column-header">
							<span class="column-drag-handle">&#x2630;</span>
							{{column.name}}
							</div>
								<Container
									group-name="col"
									@drop="(e) => onCardDrop(column.id, e)"
									@drag-start="(e) => log('drag start', e)"
									@drag-end="(e) => log('drag end', e)"
									:get-child-payload="getCardPayload(column.id)"
									drag-class="card-ghost"
									drop-class="card-ghost-drop"
                                    :drop-placeholder="dropPlaceholderOptions"
								>
									<Draggable
										v-for="card in column.children"
										:key="card.id"
									>
										<div
											:class="card.props.className"
											:style="card.props.style"
										>
											<p>{{card.data}}</p>

										</div>
									</Draggable>
								</Container>
							</div>
				</Draggable>
			</Container>
		</div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
// import { applyDrag, generateItems } from "vue-smooth-dnd";
const txt = 'trello'
const columnNames = ['to do', 'doing', 'done']

function applyDrag(arr, dragResult) {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}

const scene = {
    type: 'container',
    props: {
        orientation: 'horizontal'
    },
    children: [
        {
            id: 'column0',
            type: 'container',
            name: columnNames[0],
            props: {
                orientation: 'vertical',
                className: 'card-container'
            },
            children: [
                {
                    type: 'draggable',
                    id: '00',
                    props: {
                        className: 'card',
                        style: {backgroundColor: 'salmon'}
                    },
                    data: txt
                }
            ]
        },
        {
            id: 'column1',
            type: 'container',
            name: columnNames[1],
            props: {
                orientation: 'vertical',
                className: 'card-container'
            },
            children: [
                {
                    type: 'draggable',
                    id: '11',
                    props: {
                        className: 'card',
                        style: {backgroundColor: 'lightgreen'}
                    },
                    data: txt
                }
            ]
        },
        {
            id: 'column2',
            type: 'container',
            name: columnNames[2],
            props: {
                orientation: 'vertical',
                className: 'card-container'
            },
            children: [
                {
                    type: 'draggable',
                    id: '22',
                    props: {
                        className: 'card',
                        style: {backgroundColor: 'yellow'}
                    },
                    data: txt
                }
            ]
        },
    ]
}
export default {
	name: "Cards",
	components: { Container, Draggable },
	data() {
		return {
            scene,
            upperDropPlaceholderOptions: {
                className: 'cards-drop-preview',
                animationDuration: '150',
                showOnTop: true
            },
            dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true
            }
		}
	},
	methods: {
        onColumnDrop(dropResult) {
            const scene = Object.assign({}, this.scene)
            scene.children = applyDrag(scene.children, dropResult)
            this.scene = scene;
        },
		onCardDrop(columnId, dropResult) {
		if(dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            const scene = Object.assign({}, this.scene)
            const column = scene.children.filter(p => p.id === columnId)[0]
            const columnIndex = scene.children.indexOf(column)

            const newColumn = Object.assign({}, column)
            newColumn.children = applyDrag(newColumn.children, dropResult)
            scene.children.splice(columnIndex, 1, newColumn);
            
            this.scene = scene;
        }
        },
        getCardPayload(columnId) {
            return index => {
                return this.scene.children.filter(p => p.id === columnId)[0].children[index]
            }
        },
        dragStart() {
            console.log('drag started')
        },
        log(...params) {
            console.log(...params)
        }
	}
};
// <section class="login">
// <h1>login</h1>
// <color-picker/>
// <board-edit-background></board-edit-background>
// </section>

// import boardEditBg from '../cmps/board/board-edit-background.cmp.vue';
// import colorPicker from '../cmps/color-picker.cmp.vue';
// export default {
//     props:[],
//     data(){
//         return{

//         }
//     },
//     computed: {

//     },
//     methods: {

//     },
//     created(){

//     },
//     mounted(){

//     },
//     watch: {

//     },
//     components: {
//         boardEditBg,
//         colorPicker
//     }

// }
</script>

<style scoped>

 .card {
    height: 100px;
    width: 200px;
    border: 1px solid black;
    margin: 5px;
}

.card-container {
    background-color: beige;
    border: 1px solid black;
    margin: 10px;
}

.column-drag-handle {
    cursor: move;
    padding: 5px;
}

.card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg)
}

.card-ghost-drop {
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg)
}

</style>