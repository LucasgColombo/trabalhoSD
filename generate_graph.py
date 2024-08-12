import pandas as pd
import matplotlib.pyplot as plt
import sys

def generate_graph(dataset_path):
    df = pd.read_csv(dataset_path)
    plt.figure(figsize=(10,6))
    df.plot(kind='bar', x='title', y='price', color='skyblue')
    plt.title('Preço dos Jogos da Steam')
    plt.xlabel('Título do Jogo')
    plt.ylabel('Preço em R$')
    plt.xticks(rotation=90)
    plt.tight_layout()

    # Salvar o gráfico como imagem
    plt.savefig('public/graph.png')

if __name__ == "__main__":
    dataset_path = sys.argv[1]
    generate_graph(dataset_path)
