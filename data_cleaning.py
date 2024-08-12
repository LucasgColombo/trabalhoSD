import pandas as pd
from bs4 import BeautifulSoup
import requests

try:
    with open('/home/lucas/Documentos/GitHub/trabalhoSD/steam_games.html', 'r', encoding='utf-8') as file:
        content = file.read()
    print("Arquivo lido com sucesso!")
except FileNotFoundError:
    print("Arquivo steam_games.html não encontrado.")

# Teste o parsing do HTML
try:
    soup = BeautifulSoup(content, 'html.parser')
    print("Parsing HTML realizado com sucesso!")
except Exception as e:
    print(f"Erro ao fazer parsing do HTML: {e}")

# Extrair informações dos jogos
games = []
for game in soup.select('.search_result_row'):
    title = game.select_one('.title').text.strip() if game.select_one('.title') else 'Título não disponível'
    price_tag = game.select_one('.discount_final_price')
    
    if price_tag:
        price = price_tag.text.strip().replace('R$', '').replace(',', '.').strip()
    else:
        price = 'Preço não disponível'
    
    games.append({'title': title, 'price': price})

# Criar um DataFrame
df = pd.DataFrame(games)

# Limpar os dados (exemplo: remover jogos sem preço)
df = df[df['price'].apply(lambda x: x != 'Preço não disponível')]

# Converter preços para numéricos, forçando erros a NaN
df['price'] = pd.to_numeric(df['price'], errors='coerce')

# Salvar o DataFrame limpo
df.to_csv('/home/lucas/Documentos/GitHub/trabalhoSD/cleaned_steam_games.csv', index=False)

# Carregar o dataset
with open('/home/lucas/Documentos/GitHub/trabalhoSD/cleaned_steam_games.csv', 'rb') as file:
    response = requests.post('http://localhost:3000/upload', files={'dataset': file})

print(response.text)
