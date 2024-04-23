import { NgFor, NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';

interface nTarefa{
 id: number;
 nome: string;
 concluido: boolean;
}

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.css',
})

export class TarefaComponent implements OnInit{

  TAREFA_KEY = 'tarefa_key'
  listaTarefas : nTarefa[] = []
  
  constructor(){} 
  
  ngOnInit() : void {
    const Tarefa = localStorage.getItem(this.TAREFA_KEY)

    if(Tarefa){
      this.listaTarefas = JSON.parse(Tarefa)
    } 
  }

  adicionar(nomeTarefa: string){
    if (nomeTarefa.trim().length == 0){
      return;
    }

    const tarefaEncontrada = this.listaTarefas.find(item => item.nome.toLowerCase() == nomeTarefa.toLowerCase())

    if(!tarefaEncontrada){
       this.listaTarefas.push({id:this.listaTarefas.length,nome:nomeTarefa,concluido:false})
       this.salvarLista()
    } 
  } 

  deletar(id: number){
    this.listaTarefas = this.listaTarefas.filter(item => (item.id != id))
    this.salvarLista()
  }

  completar(id: number){
    const tarefaEncontrada = this.listaTarefas.find(item => item.id == id)

    if(tarefaEncontrada){
      tarefaEncontrada.concluido = !tarefaEncontrada.concluido
    }
  }

  // Foi utilizado o mesmo método de adicionar para efeituar a consulta de um certo produto já comprado
  // Agora veremos ou tentaremos uma forma de exigir a quantidade de um produto a ser comprada ou que já foi comprado 

  consultarLista(nomeTarefa: string){

    if(nomeTarefa.trim().length == 0){
      return;
    }

    const tarefaEncontrada = this.listaTarefas.find(item => item.nome.toLowerCase() == nomeTarefa.toLowerCase())

    if(!tarefaEncontrada){
      this.listaTarefas.push({id:this.listaTarefas.length,nome:nomeTarefa,concluido:true})
    }
  }

  // ---------------------------------------------------------------------------------------------------------------

  private salvarLista(){
    localStorage.setItem(this.TAREFA_KEY, JSON.stringify(this.listaTarefas))
  }

}
