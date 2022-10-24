import { reactive, toRef, ref, watch } from 'vue'
import { getNode, createMessage } from '@formkit/core' 

export default function useSteps () {
  const activeStep = ref('')
  const steps: any = reactive({})
  const visitedSteps: any = ref([]) // track visited steps

  // NEW: watch our activeStep and store visited steps
  // to know when to show errors
  watch(activeStep, (newStep, oldStep) => {
    if (oldStep && !visitedSteps.value.includes(oldStep)) {
      visitedSteps.value.push(oldStep)
    }
    // NEW: trigger showing validation on fields
    // within all visited steps
    visitedSteps.value.forEach((step: any) => {
      const node: any = getNode(step)
      node.walk((n: any) => {
        n.store.set(
          createMessage({
            key: 'submitted',
            value: true,
            visible: false,
          })
        )
      })
    })
  })

  const setStep = (delta: any) => {
    const stepNames = Object.keys(steps)
    const currentIndex = stepNames.indexOf(activeStep.value)
    activeStep.value = stepNames[currentIndex + delta]
  }

  const stepPlugin = (node: any) => {

    if (node.props.type == "group") {
      // builds an object of the top-level groups
      steps[node.name] = steps[node.name] || {}

      node.on('created', () => {
        // use 'on created' to ensure context object is available
        steps[node.name].valid = toRef(node.context.state, 'valid')
      })

      // NEW: Store or update the count of blocking validation messages.
      // FormKit emits the "count:blocking" event (with the count) each
      // time the count changes.
      node.on('count:blocking', ({ payload: count }: any ) => {
        steps[node.name].blockingCount = count
      })

      // NEW: Store or update the count of backend error messages.
      node.on('count:errors', ({ payload: count }: any ) => {
        steps[node.name].errorCount = count
      })

      // set the active tab to the 1st tab
      if (activeStep.value === '') {
        activeStep.value = node.name
      }

      // Stop plugin inheritance to descendant nodes
      return false
    }
  }

  return { activeStep, visitedSteps, steps, stepPlugin, setStep }

}