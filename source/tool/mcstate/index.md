<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>服务器信息</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .container p {
            margin:0;
}
        .constainer img{
            margin:0
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .server-header {
            text-align: center;
            margin-bottom: 30px;
        }
        #server-icon {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 0 auto 15px;
            display: block;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .server-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 30px;
        }
        .detail-item {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            display: flex;
            align-items: center;
        }
        .detail-item i {
            width: 24px;
            color: #6c757d;
            margin-right: 10px;
        }
        .detail-label {
            font-size: 14px;
            color: #6c757d;
            margin: 0 0 5px;
        }
        .detail-value {
            font-size: 16px;
            font-weight: 500;
            color: #333;
            margin: 0;
        }
        .player-count {
            text-align: center;
            margin: 20px 0;
            padding: 15px;
            background-color: #e3f2fd;
            border-radius: 8px;
        }
        .player-count p {
            margin: 0;
            font-size: 18px;
            color: #1976d2;
            font-weight: 500;
        }
        .players-section {
            margin: 30px 0;
        }
        .players-title {
            font-size: 18px;
            color: #333;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }
        .players-list {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }
        .player-item {
            background-color: #f8f9fa;
            padding: 12px;
            border-radius: 8px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            position: relative;
            transition: transform 0.2s;
        }
        .player-item:hover {
            transform: translateY(-2px);
        }
        .player-avatar {
            width: 60px;
            height: 60px;
            border-radius: 6px; /* 圆角矩形 */
            object-fit: cover;
            border: 2px solid #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            background-color: #eee;
            margin: 0px;
        }
        img.player-avatar{
            margin:0;
        }
        .player-info {
            flex: 1;
        }
        .player-name {
            font-weight: 500;
            padding:7px;
            color: #333;
        }
        .player-uuid {
            font-size: 11px;
            color: #888;
            margin: 0;
            word-break: break-all;
        }
        .player-status {
            color: #4CAF50;
        }
        .no-players {
            color: #6c757d;
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
            width: 100%;
        }
        #copy-button.copied {
            background-color: #28a745;
        }
        #copy-button p {
            color: hotpink;
            font-size: 17px;
            padding: 15px 0;
            margin: 0;
        }
        .tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s;
            margin-bottom: 5px;
            z-index: 1;
        }
        .player-item:hover .tooltip {
            visibility: visible;
            opacity: 1;
        }
        .copy-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0,0,0,0.8);
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .copy-notification.show {
            opacity: 1;
        }
        .loading-avatar {
            background: #eee url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolyline points='16 12 12 8 8 12'%3E%3C/polyline%3E%3C/svg%3E") center no-repeat;
            background-size: 24px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div id="server-info">
            <div class="loading-message" style="text-align: center; padding: 20px;">
                <i class="fas fa-circle-notch fa-spin"></i> 正在加载服务器信息...
            </div>
        </div>
    </div>
    <!-- 复制提示框 -->
    <div class="copy-notification" id="copyNotification"></div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const serverAddress = 'g1-10.xyeidc.cn:20504';
            queryServer(serverAddress);
        });
        function queryServer(address) {
            const url = `https://api.mcsrvstat.us/2/${address}`;     
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const players = data.players || { online: 0, max: 100, list: [], uuid: {} };
                    displayServerInfo({...data, players}, address);
                })
                .catch(error => {
                    document.getElementById('server-info').innerHTML = `
                        <div class="error-message">
                            <i class="fas fa-exclamation-circle"></i> 加载失败：${error.message}
                        </div>
                    `;
                });
        }
        // 从mcuuid.net获取UUID（用于头像）
        function getAvatarUUID(playerName) {
            return fetch(`https://mcuuid.net/api/nick/${playerName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('获取头像UUID失败');
                    }
                    return response.json();
                })
                .then(data => {
                    // 返回正版UUID（不含连字符）
                    return data.id.replace(/-/g, '');
                })
                .catch(error => {
                    console.error(`获取${playerName}的头像UUID失败:`, error);
                    // 失败时返回null
                    return null;
                });
        }
        function displayServerInfo(data, address) {
            const serverInfoDiv = document.getElementById('server-info');        
            // 生成玩家列表HTML
            let playersList = '';
            if (data.players.online > 0 && data.players.list.length > 0) {
                // 先创建玩家列表容器
                playersList = `<div class="players-list"></div>`;
                // 构建页面基本结构
                serverInfoDiv.innerHTML = `
                    <div class="server-header">
                        <img id="server-icon" src="https://img.cdn1.vip/i/688c4b5ed4aa3_1754024798.webp" alt="服务器图标">
                        <h1 id="server-name">佳莉敦の世界</h1>
                    </div>
                    <div class="server-details">
                        <div class="detail-item">
                            <i class="fas fa-server"></i>
                            <div>
                                <p class="detail-label">服务器版本</p>
                                <p class="detail-value">${data.version || '1.21.6'}</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-cogs"></i>
                            <div>
                                <p class="detail-label">服务器核心</p>
                                <p class="detail-value">${data.software || 'Paper'}</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <div>
                                <p class="detail-label">在线人数</p>
                                <p class="detail-value">${data.players.online} 人</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-user-friends"></i>
                            <div>
                                <p class="detail-label">最大人数</p>
                                <p class="detail-value">${data.players.max} 人</p>
                            </div>
                        </div>
                    </div>
                    <div class="player-count">
                        <p>当前在线: ${data.players.online} / ${data.players.max} 玩家</p>
                    </div>
                    <div class="players-section">
                        <h3 class="players-title"><i class="fas fa-users"></i> 在线玩家</h3>
                        ${playersList}
                    </div>
                    <div class="player-count">
                        <p class="connection-label">服务器地址</p>
                        <div id="copy-button" onclick="copyText('${address}')">
                            <p>${address}</p>
                        </div>
                    </div>
                `;
                // 获取玩家列表容器
                const playersListContainer = document.querySelector('.players-list');    
                // 为每个玩家获取信息并添加到列表
                data.players.list.forEach(async (player) => {
                    // 显示的UUID来自mcsrvstat.us
                    let displayUuid = data.players.uuid && data.players.uuid[player] 
                        ? data.players.uuid[player]
                        : '未知UUID';
                    // 格式化显示的UUID
const formattedDisplayUuid = formatUUID(displayUuid.replace(/-/g, ''));                    // 头像专用UUID来自mcuuid.net
                    const avatarUuid = await getAvatarUUID(player);
                    // 使用crafthead.net API，通过头像UUID获取头像
                    let avatarUrl = `https://minotar.net/avatar/${player}/100`; // 备用头像
                    if (avatarUuid) {
                        avatarUrl = `https://crafthead.net/avatar/${avatarUuid}`;
                    }
                    // 创建玩家元素
                    const playerElement = document.createElement('div');
                    playerElement.className = 'player-item';
                    playerElement.innerHTML = `
                        <div class="tooltip">点击复制UUID</div>
                        <img class="player-avatar loading-avatar" 
                             src="${avatarUrl}" 
                             alt="${player}的头像"
                             onerror="this.src='https://minotar.net/avatar/${player}/100'; this.classList.remove('loading-avatar')"
                             onload="this.classList.remove('loading-avatar')">
                        <div class="player-info">
                            <p class="player-name">
                                <i class="fas fa-circle player-status"></i> ${player}
                            </p>
                            <p class="player-uuid" onclick="copyText('${displayUuid.replace(/-/g, '') || formattedDisplayUuid}')">${formattedDisplayUuid}</p>
                        </div>
                    `;
                    // 添加到玩家列表
                    playersListContainer.appendChild(playerElement);
                });
            } else {
                playersList = `<div class="no-players"><i class="fas fa-user-slash"></i> 当前没有玩家在线</div>`;
                serverInfoDiv.innerHTML = `
                    <div class="server-header">
                        <img id="server-icon" src="https://img.cdn1.vip/i/688c4b5ed4aa3_1754024798.webp" alt="服务器图标">
                        <h1 id="server-name">佳莉敦の世界</h1>
                    </div>
                    <div class="server-details">
                        <div class="detail-item">
                            <i class="fas fa-server"></i>
                            <div>
                                <p class="detail-label">服务器版本</p>
                                <p class="detail-value">${data.version || '1.21.6'}</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-cogs"></i>
                            <div>
                                <p class="detail-label">服务器核心</p>
                                <p class="detail-value">${data.software || 'Paper'}</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <div>
                                <p class="detail-label">在线人数</p>
                                <p class="detail-value">${data.players.online} 人</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-user-friends"></i>
                            <div>
                                <p class="detail-label">最大人数</p>
                                <p class="detail-value">${data.players.max} 人</p>
                            </div>
                        </div>
                    </div>
                    <div class="player-count">
                        <p>当前在线: ${data.players.online} / ${data.players.max} 玩家</p>
                    </div>
                    <div class="players-section">
                        <h3 class="players-title"><i class="fas fa-users"></i> 在线玩家</h3>
                        ${playersList}
                    </div>
                    <div class="player-count">
                        <p class="connection-label">服务器地址</p>
                        <div id="copy-button" onclick="copyText('${address}')">
                            <p>${address}</p>
                        </div>
                    </div>
                `;
            }
        }
        // 格式化UUID为带连字符的标准格式
        function formatUUID(uuid) {
            if (uuid.length === 32) {
                return `${uuid.substr(0,8)}-${uuid.substr(8,4)}-${uuid.substr(12,4)}-${uuid.substr(16,4)}-${uuid.substr(20)}`;
            }
            return uuid;
        }
        // 复制文本到剪贴板
        async function copyText(text) {
            try {
                await navigator.clipboard.writeText(text);
                // 显示复制成功提示
                const notification = document.getElementById('copyNotification');
                notification.textContent = '已复制: ' + (text.length > 20 ? text.substr(0,20) + '...' : text);
                notification.classList.add('show');         
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 1500);
            } catch (err) {
                alert('复制失败，请手动复制');
            }
        }
    </script>
</body>
</html>
    