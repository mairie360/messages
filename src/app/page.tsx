'use client';

import { useState } from "react";
import Image from "next/image";

export default function Page() {

    interface Message {
      sender: string;
      text: string;
      timestamp: string;
    }

  interface Conversation {
      id: number;
      user: string;
      image: string;
      messages: Message[];
    }
  
    
    const [conversations, setConversations] = useState<Conversation[]>([
      {
        id: 1,
        user: "alice.dupont",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        messages: [
          { sender: "alice.dupont", text: "Hey Evan ! Tu viens toujours à la soirée ce soir ? 🎉", timestamp: "2024-03-11T18:30:00Z" },
          { sender: "evan", text: "Yes, je passe vers 21h !", timestamp: "2024-03-11T18:32:00Z" },
        ],
      },
      {
        id: 2,
        user: "pierre.martin",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        messages: [
          { sender: "pierre.martin", text: "T’as vu le match hier ? Incroyable ! ⚽🔥", timestamp: "2024-03-10T21:15:00Z" },
          { sender: "evan", text: "Grave ! Quelle fin de match 😱", timestamp: "2024-03-10T21:17:00Z" },
        ],
      },
      {
        id: 3,
        user: "lea_bdx",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        messages: [
          { sender: "lea_bdx", text: "J’ai une surprise pour toi 😏", timestamp: "2024-03-09T15:00:00Z" },
          { sender: "evan", text: "Ah ouais ? J’ai hâte de voir ça !", timestamp: "2024-03-09T15:05:00Z" },
        ],
      },
      {
        id: 4,
        user: "max.dupont",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        messages: [
          { sender: "max.dupont", text: "Passe chez moi demain, faut qu’on parle !", timestamp: "2024-03-08T12:45:00Z" },
          { sender: "evan", text: "Ok, 16h ça te va ?", timestamp: "2024-03-08T12:47:00Z" },
        ],
      },
      {
        id: 5,
        user: "mathilde.lefevre",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        messages: [
          { sender: "evan", text: "T’as vu cette vidéo ? 😂", timestamp: "2024-03-07T23:10:00Z" },
          { sender: "mathilde.lefevre", text: "Haha t’es trop drôle 😂", timestamp: "2024-03-07T23:20:00Z" },
        ],
      },
      {
        id: 6,
        user: "startup.io",
        image: "https://randomuser.me/api/portraits/men/6.jpg",
        messages: [
          { sender: "startup.io", text: "Bonjour Evan, nous avons bien reçu votre demande. Nous reviendrons vers vous rapidement.", timestamp: "2024-03-06T14:10:00Z" },
          { sender: "evan", text: "Merci, j’attends votre retour avec impatience.", timestamp: "2024-03-06T14:12:00Z" },
        ],
      },
      {
        id: 7,
        user: "jules_music",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        messages: [
          { sender: "jules_music", text: "Écoute ce son, c’est une pépite 🎶", timestamp: "2024-03-05T22:00:00Z" },
          { sender: "evan", text: "Wow, j’adore ! Merci pour la reco 🎧", timestamp: "2024-03-05T22:05:00Z" },
        ],
      },
      {
        id: 8,
        user: "julien.bernard",
        image: "https://randomuser.me/api/portraits/men/8.jpg",
        messages: [
          { sender: "julien.bernard", text: "J’ai bossé sur le projet, check tes mails !", timestamp: "2024-03-04T09:30:00Z" },
          { sender: "evan", text: "Top, je regarde ça et je te fais un retour 👍", timestamp: "2024-03-04T09:35:00Z" },
        ],
      },
      {
        id: 9,
        user: "emma_lifestyle",
        image: "https://randomuser.me/api/portraits/women/9.jpg",
        messages: [
          { sender: "emma_lifestyle", text: "J’ai posté de nouvelles photos, dis-moi ce que t’en penses 📸✨", timestamp: "2024-03-03T18:40:00Z" },
          { sender: "evan", text: "Elles sont super belles ! T’as trop de talent ! 👏", timestamp: "2024-03-03T18:45:00Z" },
        ],
      },
      {
        id: 10,
        user: "marc.durand",
        image: "https://randomuser.me/api/portraits/men/10.jpg",
        messages: [
          { sender: "marc.durand", text: "Réunion confirmée pour vendredi, 14h.", timestamp: "2024-03-02T15:50:00Z" },
          { sender: "evan", text: "Parfait, à vendredi alors.", timestamp: "2024-03-02T15:52:00Z" },
        ],
      },
    ]);
    
    
    
  
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState("");
  
    const sendMessage = () => {
      if (!selectedConversation || newMessage.trim() === "") return;
  
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              {
                sender: "evan",
                text: newMessage,
                timestamp: new Date().toISOString(),
              },
            ],
          };
        }
        return conv;
      });
  
      setConversations(updatedConversations);
      setSelectedConversation(updatedConversations.find((conv) => conv.id === selectedConversation.id) || null);
      setNewMessage("");
    };
  
    return (
      <div className="flex flex-col">
        <div className="flex flex-grow overflow-hidden">
          <aside
            className={`w-full md:w-1/4 h-full p-4 shadow-md overflow-y-auto ${selectedConversation ? "hidden md:block" : "block"}`}
          >
            <ul className="list bg-base-100 rounded-box shadow-md">
              {conversations.map((conversation) => (
                <li
                  key={conversation.id}
                  className={`flex items-center p-3 border-b cursor-pointer ${
                    selectedConversation?.id === conversation.id ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <Image className="size-10 rounded-box" src={conversation.image} alt="Profile" width={40} height={40} />
                  <div className="ml-2">
                    <div>{conversation.user}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">{conversation.messages[0].text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
    
          <main className={`flex-grow h-full p-6 flex flex-col space-y-4 overflow-y-auto w-full ${selectedConversation ? "md:flex" : "hidden"}`}>
            {selectedConversation ? (
              <>
                <button
                  className="mb-4 p-2 bg-red-500 text-white rounded-md md:hidden"
                  onClick={() => setSelectedConversation(null)}
                >
                  Retour
                </button>
    
            
                {selectedConversation.messages.map((message, index) => (
                  <div key={index} className={`chat ${message.sender === "evan" ? "chat-end" : "chat-start"}`}>
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <Image src={selectedConversation.image} alt="Profile" width={40} height={40} />
                      </div>
                    </div>
                    <div className="chat-header">
                      {message.sender}
                      <time className="text-xs opacity-50 ml-2">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </time>
                    </div>
                    <div className="chat-bubble">{message.text}</div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center text-gray-500">Sélectionnez une conversation</div>
            )}
    
            {selectedConversation && (
              <div className="flex items-center p-2 border-t">
                <input
                  type="text"
                  placeholder="Écrire un message..."
                  className="flex-grow p-2 border rounded-lg outline-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>
                  Envoyer
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    );
    
  }