import { every } from "d3";

type FileNode = {
  name: string;
  type: 'file' | 'directory' | 'project' | 'workflow' | 'package';
  children?: FileNode[];
};

const fileTree: FileNode = {
  name: "turtlebot3_simulations",
  type: "project",
  children: [
    {
      name: ".github",
      type: "directory",
      children: [
        {
          name: "workflows",
          type: "directory",
          children: [
            {
              name: "ros-ci.yml",
              type: "file"
            }
          ]
        }
      ]
    },
    {
      name: "turtlebot3_fake_node",
      type: "package",
      children: [
        {
          name: "include",
          type: "directory",
          children: [
            {
              name: "turtlebot3_fake_node",
              type: "directory",
              children: [
                {
                  name: "turtlebot3_fake_node.hpp",
                  type: "file"
                }
              ]
            }
          ]
        },
        {
          name: "launch",
          type: "directory",
          children: [
            {
              name: "rviz2.launch.py",
              type: "file"
            },
            {
              name: "turtlebot3_fake_node.launch.py",
              type: "file"
            }
          ]
        },
        {
          name: "param",
          type: "directory",
          children: [
            {
              name: "burger.yaml",
              type: "file"
            },
            {
              name: "waffle.yaml",
              type: "file"
            },
            {
              name: "waffle_pi.yaml",
              type: "file"
            }
          ]
        },
        {
          name: "src",
          type: "directory",
          children: [
            {
              name: "turtlebot3_fake_node.cpp",
              type: "file"
            }
          ]
        },
        {
          name: "CHANGELOG.rst",
          type: "file"
        },
        {
          name: "CMakeLists.txt",
          type: "file"
        },
        {
          name: "package.xml",
          type: "file"
        }
      ]
    },
    {
      name: "turtlebot3_gazebo",
      type: "package",
      children: [
        {
          name: "include",
          type: "directory",
          children: [
            {
              name: "turtlebot3_gazebo",
              type: "directory",
              children: [
                {
                  name: "turtlebot3_drive.hpp",
                  type: "file"
                }
              ]
            }
          ]
        },
        {
          name: "launch",
          type: "directory",
          children: [
            {
              name: "empty_world.launch.py",
              type: "file"
            },
            {
              name: "robot_state_publisher.launch.py",
              type: "file"
            },
            {
              name: "spawn_turtlebot3.launch.py",
              type: "file"
            },
            {
              name: "turtlebot3_dqn_stage1.launch.py",
              type: "file"
            },
            {
              name: "turtlebot3_dqn_stage2.launch.py",
              type: "file"
            },
            {
              name: "turtlebot3_dqn_stage3.launch.py",
              type: "file"
            },
            {
              name: "turtlebot3_dqn_stage4.launch.py",
              type: "file"
            },
            {
              name: "turtlebot3_house.launch.py",
              type: "file"
            },
            {
              name: "turtlebot3_world.launch.py",
              type: "file"
            }
          ]
        },
        {
          name: "models",                  // TODO: finish building out this directory
          type: "directory",
          children: [
            {
              name: "turtlebot3_burger",
              type: "directory",
              children: [
                {
                  name: "model-1_4.sdf",
                  type: "file"
                },
                {
                  name: "model.config",
                  type: "file"
                },
                {
                  name: "model.sdf",
                  type: "file"
                }
              ]
            }
          ]
        },
        {
          name: "rviz",
          type: "directory",
          children: [
            {
              name: "tb3_gazebo.rviz",
              type: "file"
            }
          ]
        },
        {
          name: "src",
          type: "directory",
          children: [
            {
              name: "turtlebot3_drive.cpp",
              type: "file"
            }
          ]
        },
        {
          name: "urdf",                 // TODO: finish building out this directory
          type: "directory",
          children: [
            {
              name: "common_properties.urdf",
              type: "file"
            }
          ]
        },
        {
          name: "worlds",               // TODO: finish building out this directory
          type: "directory",
          children: [
            {
              name: "empty_world.world",
              type: "file"
            },
            {
              name: "turtlebot3_dqn_stage1.world",
              type: "file"
            }
          ]
        },
        {
          name: "CHANGELOG.rst",
          type: "file"
        },
        {
          name: "CMakeLists.txt",
          type: "file"
        },
        {
          name: "package.xml",
          type: "file"
        }
      ]
    },
    {
      name: "turtlebot3_simulations",
      type: "package",
      children: [
        {
          name: "CHANGELOG.rst",
          type: "file"
        },
        {
          name: "CMakeLists.txt",
          type: "file"
        },
        {
          name: "package.xml",
          type: "file"
        }
      ]
    },
    {
      name: "CONTRIBUTING.md",
      type: "file"
    },
    {
      name: "LICENSE",
      type: "file"
    },
    {
      name: "README.md",
      type: "file"
    },
    {
      name: "turtlebot3_simulations_ci.repos",
      type: "file"
    }
  ]
};

export default fileTree;

export function getProjectName(node: FileNode): string | undefined {
  if (node.type === 'project') {
    return node.name;
  }
}

export function getDirectoryNames(node: FileNode): Array<string> {
  const directoryList = [];

  for (const child of node.children) {
    if (child.type == 'directory') {
      directoryList.push(child.name);
    }
  }
  return directoryList;
}
