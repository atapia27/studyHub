import { Scene } from '@root/models/scene'
import { randomIntFromInterval } from '@root/utils/randomHelpers'
import { RootStore } from '@store/rootStore'
import { makeAutoObservable, runInAction } from 'mobx'

export class SceneStore {
  rootStore: RootStore
  scenes: Scene[] = []
  sceneIndex = 0

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
    this.loadScenes()
  }

  get currentScene() {
    return this.scenes[this.sceneIndex]
  }

  setCurrentScene = (sceneId: string) => {
    const scene = this.scenes.find((scene) => scene.id === sceneId) as Scene
    this.sceneIndex = this.scenes.indexOf(scene)
    this.rootStore.uiStore.closeSceneSelector()
  }

  loadScenes = async () => {
    const response = await fetch('/scenes.json')
    const data = await response.json()
    runInAction(() => {
      this.scenes = data
      this.sceneIndex = randomIntFromInterval(0, this.scenes.length - 1)
    })
  }
}
