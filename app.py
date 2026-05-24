from flask import Flask, request, jsonify, send_from_directory
import json

app = Flask(__name__, static_folder='.', static_url_path='')

def check_winner(b):
    lines = [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)]
    for a,c,d in lines:
        if b[a] and b[a]==b[c] and b[a]==b[d]:
            return b[a]
    return None

def minimax(board, current, player, bot):
    avail = [i for i,v in enumerate(board) if not v]
    winner = check_winner(board)
    if winner==player:
        return {'score': -10}
    if winner==bot:
        return {'score': 10}
    if not avail:
        return {'score': 0}
    moves = []
    for i in avail:
        move = {'index': i}
        board[i] = current
        result = minimax(board, bot if current==player else player, player, bot)
        move['score'] = result['score']
        board[i] = ''
        moves.append(move)
    best_move = None
    if current==bot:
        best_score = -9999
        for m in moves:
            if m['score']>best_score:
                best_score = m['score']; best_move = m
    else:
        best_score = 9999
        for m in moves:
            if m['score']<best_score:
                best_score = m['score']; best_move = m
    return best_move

@app.route('/api/bot', methods=['POST'])
def api_bot():
    try:
        data = request.get_json()
        board = data.get('board', [])
        difficulty = data.get('difficulty', 'medium')
        player = data.get('player', 'X')
        bot = data.get('bot', 'O')
        # normalize empty values to ''
        board = [b if b in ('X','O') else '' for b in board]
        # easy: random
        import random
        empt = [i for i,v in enumerate(board) if not v]
        if not empt:
            return jsonify({'move': None})
        if difficulty=='easy':
            return jsonify({'move': random.choice(empt)})
        # medium: try win/block
        if difficulty=='medium':
            for i in empt:
                copy = board[:]; copy[i]=bot
                if check_winner(copy)==bot: return jsonify({'move': i})
            for i in empt:
                copy = board[:]; copy[i]=player
                if check_winner(copy)==player: return jsonify({'move': i})
            return jsonify({'move': random.choice(empt)})
        # hard: minimax
        best = minimax(board[:], bot, player, bot)
        return jsonify({'move': best['index'] if best and 'index' in best else random.choice(empt)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# serve static files (html/js/css)
@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory('.', path)

@app.route('/')
def root():
    return send_from_directory('.', 'index.html')

if __name__=='__main__':
    app.run(host='0.0.0.0', port=5000)
